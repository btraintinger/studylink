import {
  SessionInformation,
  WebUntisElementType,
  Klasse,
  SchoolYear,
  Department,
  Teacher,
  Room,
  WebElementData,
} from 'webuntis';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from 'bcrypt';
import { authenticator as Authenticator } from 'otplib';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { WebUntisSecretAuth } from 'webuntis';
import { generatePassword } from '../../utils/passwordGenerator';
import type { Context } from '../context';
import { WebUntis, WebUntisImportInput } from './webuntis.type';
import { Student, WebAPITimetable } from 'webuntis';
import {
  School,
  SchoolClass,
  Department as SchoolDepartment,
} from '@prisma/client';

@Resolver((of) => WebUntis)
export class WebUntisResolver {
  @Authorized('ADMIN')
  @Mutation((returns) => WebUntis)
  async updateSchoolData(
    @Ctx() ctx: Context,
    @Arg('loginData') loginData: WebUntisImportInput
  ) {
    const untis = new WebUntisSecretAuth(
      loginData.school,
      loginData.username,
      loginData.secret,
      `${loginData.server}.webuntis.com`,
      'custom-identity',
      Authenticator
    );

    let loginInfo: SessionInformation;
    try {
      loginInfo = await untis.login();
    } catch (error) {
      throw new Error('WebUntisNotAuthenticatedError');
    }

    const currentSchool = await getCurrentSchool(ctx);

    const latestSchoolYear = await untis.getLatestSchoolyear();

    await clearSchoolData(ctx);

    const departments = await importDepartments(untis, ctx, currentSchool);

    await importSchoolClasses(
      untis,
      latestSchoolYear,
      ctx,
      departments,
      currentSchool
    );

    await importRooms(untis, ctx, currentSchool);

    await importSchoolSubjects(untis, ctx, currentSchool);

    if (loginInfo.personType === WebUntisElementType.TEACHER) {
      await importTeachers(untis, ctx, currentSchool);

      await importStudents(untis, currentSchool, ctx);
    }

    await untis.logout();

    return loginData;
  }
}

async function importStudents(
  untis: WebUntisSecretAuth,
  currentSchool: School,
  ctx: Context
) {
  const dbSchoolClasses = await ctx.prisma.schoolClass.findMany({
    where: {
      department: {
        schoolId: currentSchool.id,
      },
    },
  });

  const students = await untis.getStudents();
  students.forEach(async (student) => {
    const lastBirthYearDigits = student.name.slice(-2);
    const email = `${student.foreName.toLowerCase()}.${student.longName.toLowerCase()}${lastBirthYearDigits}@${
      currentSchool.domain
    }`;
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentSchoolClass = await getStudentSchoolClass();

    if (!studentSchoolClass) return;

    await ctx.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'STUDENT',
        name: student.name,
        firstName: student.foreName,
        lastName: student.longName,
        student: {
          create: {
            schoolClassId: studentSchoolClass.id,
          },
        },
      },
    });

    async function getStudentSchoolClass() {
      const studentTimetable = await untis.getTimetableForWeek(
        new Date(),
        student.id,
        WebUntisElementType.STUDENT,
        1
      );

      let studentClass: WebElementData | null = null;
      for (const element of studentTimetable) {
        if (element.classes.length === 0) {
          studentClass = element.classes[0];
          break;
        }
      }

      const studentSchoolClass = dbSchoolClasses.find(
        (schoolClass) => schoolClass.name === studentClass?.element.name
      );
      return studentSchoolClass;
    }
  });
}

async function importTeachers(
  untis: WebUntisSecretAuth,
  ctx: Context,
  currentSchool: School
) {
  const teachers = await untis.getTeachers();
  await ctx.prisma.teacher.createMany({
    data: teachers.map((teacher) => ({
      name: teacher.name,
      longName: teacher.longName,
      schoolId: currentSchool.id,
    })),
  });
}

async function importSchoolSubjects(
  untis: WebUntisSecretAuth,
  ctx: Context,
  currentSchool: School
) {
  const schoolSubjects = await untis.getSubjects();
  await ctx.prisma.schoolSubject.createMany({
    data: schoolSubjects.map((schoolSubject) => ({
      name: schoolSubject.name,
      longName: schoolSubject.longName,
      schoolId: currentSchool.id,
    })),
  });
}

async function importRooms(
  untis: WebUntisSecretAuth,
  ctx: Context,
  currentSchool: School
) {
  const rooms = await untis.getRooms();
  await ctx.prisma.room.createMany({
    data: rooms.map((room) => ({
      name: room.name,
      schoolId: currentSchool.id,
    })),
  });
}

async function importSchoolClasses(
  untis: WebUntisSecretAuth,
  latestSchoolYear: SchoolYear,
  ctx: Context,
  departments: Department[],
  currentSchool: School
) {
  const dbDepartments = await ctx.prisma.department.findMany({
    where: {
      schoolId: currentSchool.id,
    },
  });

  const schoolClasses = await untis.getClasses(true, latestSchoolYear.id);
  await ctx.prisma.schoolClass.createMany({
    data: schoolClasses
      .filter((schoolClass) =>
        getDepartmentIdFromWebUntisSchoolClass(
          schoolClass,
          departments,
          dbDepartments
        )
      )
      .map((schoolClass) => ({
        name: schoolClass.name,
        longName: schoolClass.longName,
        departmentId: getDepartmentIdFromWebUntisSchoolClass(
          schoolClass,
          departments,
          dbDepartments
        ) as number,
      })),
  });
}

async function importDepartments(
  untis: WebUntisSecretAuth,
  ctx: Context,
  currentSchool: School
) {
  const departments = await untis.getDepartments();
  await ctx.prisma.department.createMany({
    data: departments.map((department) => ({
      name: department.name,
      longName: department.longName,
      schoolId: currentSchool.id,
    })),
  });
  return departments;
}

async function getCurrentSchool(ctx: Context): Promise<School> {
  if (!ctx.user?.admin?.schoolId) throw new Error('NoSchoolError');

  const school = await ctx.prisma.school.findUnique({
    where: {
      id: ctx.user.admin.schoolId,
    },
  });

  if (!school) throw new Error('NoSchoolError');
  return school;
}

async function clearSchoolData(ctx: Context) {
  if (!ctx.user?.admin?.schoolId) throw new Error('NoSchoolError');

  await ctx.prisma.department.deleteMany({
    where: {
      schoolId: ctx.user.admin.schoolId,
    },
  });

  await ctx.prisma.teacher.deleteMany({
    where: {
      schoolId: ctx.user.admin.schoolId,
    },
  });

  await ctx.prisma.room.deleteMany({
    where: {
      schoolId: ctx.user.admin.schoolId,
    },
  });

  await ctx.prisma.schoolSubject.deleteMany({
    where: {
      schoolId: ctx.user.admin.schoolId,
    },
  });
}

function getDepartmentIdFromWebUntisSchoolClass(
  schoolClass: Klasse,
  webUntisDepartments: Department[],
  dbDepartments: Department[]
): number | null {
  const webUntisDepartmentId = schoolClass.did || schoolClass.departmentId;
  if (!webUntisDepartmentId) return null;

  const department = webUntisDepartments.find(
    (department) => department.id === webUntisDepartmentId
  );

  const correctDepartmentDB = dbDepartments.find(
    (schoolDepartment) => schoolDepartment.name === department?.name
  );
  return correctDepartmentDB?.id || null;
}
