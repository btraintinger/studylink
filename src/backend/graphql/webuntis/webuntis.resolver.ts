import { SessionInformation, WebUntisElementType } from 'webuntis';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from 'bcrypt';
import { authenticator as Authenticator } from 'otplib';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { WebUntisSecretAuth } from 'webuntis';
import { generatePassword } from '../../utils/passwordGenerator';
import type { Context } from '../context';
import { WebUntis, WebUntisImportInput } from './webuntis.type';

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

    if (!ctx.user?.admin?.schoolId) throw new Error('NoSchoolFoundError');
    const currentSchool = await ctx.prisma.school.findUnique({
      where: {
        id: ctx.user.admin.schoolId,
      },
    });
    if (!currentSchool) throw new Error('NoSchoolFoundError');

    const latestSchoolYear = await untis.getLatestSchoolyear();

    const departments = await untis.getDepartments();
    let schoolDepartments = await ctx.prisma.department.findMany({
      where: {
        schoolId: currentSchool.id,
      },
    });
    departments.forEach(async (department) => {
      const currentDepartment = schoolDepartments.find(
        (schoolDepartment) => schoolDepartment.name === department.name
      );
      if (!currentDepartment) {
        await ctx.prisma.department.create({
          data: {
            name: department.name,
            longName: department.longName,
            school: {
              connect: {
                id: currentSchool.id,
              },
            },
          },
        });
      } else {
        await ctx.prisma.department.update({
          where: {
            id: currentDepartment.id,
          },
          data: {
            name: department.name,
            longName: department.longName,
          },
        });
      }
    });

    const schoolClasses = await untis.getClasses(true, latestSchoolYear.id);
    const schoolSchoolClasses = await ctx.prisma.schoolClass.findMany({
      where: {
        department: {
          schoolId: currentSchool.id,
        },
      },
    });
    schoolClasses.forEach(async (schoolClass) => {
      const webUntisDepartmentId = schoolClass.did || schoolClass.departmentId;
      if (!webUntisDepartmentId) return;

      const currentSchoolClass = schoolSchoolClasses.find(
        (schoolSchoolClass) => schoolSchoolClass.name === schoolClass.name
      );
      const correctDepartment = departments.find(
        (department) => department.id === webUntisDepartmentId
      );
      schoolDepartments = await ctx.prisma.department.findMany({
        where: {
          schoolId: currentSchool.id,
        },
      });
      const correctDepartmentDB = schoolDepartments.find(
        (schoolDepartment) => schoolDepartment.name === correctDepartment?.name
      );
      if (!correctDepartmentDB) return;

      if (!currentSchoolClass) {
        await ctx.prisma.schoolClass.create({
          data: {
            name: schoolClass.name,
            longName: schoolClass.longName,
            department: {
              connect: {
                id: correctDepartmentDB.id,
              },
            },
          },
        });
      } else {
        await ctx.prisma.schoolClass.update({
          where: {
            id: currentSchoolClass.id,
          },
          data: {
            name: schoolClass.name,
            longName: schoolClass.longName,
            department: { connect: { id: correctDepartmentDB?.id } },
          },
        });
      }
    });

    const subjects = await untis.getSubjects();
    const schoolSubjects = await ctx.prisma.schoolSubject.findMany({
      where: {
        classHasSubject: {
          some: {
            schoolClass: {
              department: {
                schoolId: currentSchool.id,
              },
            },
          },
        },
      },
    });
    subjects.forEach(async (subject) => {
      const currentSubject = schoolSubjects.find(
        (schoolSubject) => schoolSubject.name === subject.name
      );
      if (!currentSubject) {
        await ctx.prisma.schoolSubject.create({
          data: {
            name: subject.name,
            longName: subject.longName,
            school: {
              connect: {
                id: currentSchool.id,
              },
            },
          },
        });
      } else {
        await ctx.prisma.schoolSubject.update({
          where: {
            id: currentSubject.id,
          },
          data: {
            name: subject.name,
            longName: subject.longName,
          },
        });
      }
    });

    if (loginInfo.personType === WebUntisElementType.TEACHER) {
      const teachers = await untis.getTeachers();
      const schoolTeachers = await ctx.prisma.teacher.findMany({
        where: {
          schoolId: currentSchool.id,
        },
      });
      teachers.forEach(async (teacher) => {
        const currentTeacher = schoolTeachers.find(
          (schoolTeacher) => schoolTeacher.name === teacher.name
        );
        if (!currentTeacher) {
          await ctx.prisma.teacher.create({
            data: {
              name: teacher.name,
              longName: `${teacher.foreName} ${teacher.longName}`,
              school: {
                connect: {
                  id: currentSchool.id,
                },
              },
            },
          });
        } else {
          await ctx.prisma.teacher.update({
            where: {
              id: currentTeacher.id,
            },
            data: {
              name: teacher.name,
              longName: `${teacher.foreName} ${teacher.longName}`,
            },
          });
        }
      });

      const students = await untis.getStudents();
      const schoolStudents = await ctx.prisma.student.findMany({
        where: {
          schoolClass: {
            department: {
              schoolId: currentSchool.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
      students.forEach(async (student) => {
        const currentStudent = schoolStudents.find(
          (schoolStudent) => schoolStudent.user.name === student.name
        );
        const lastBirthYearDigits = parseInt(student.name.slice(-2), 10);
        const email = `${student.foreName.toLowerCase()}.${student.longName.toLowerCase()}${lastBirthYearDigits}@${
          currentSchool.domain
        }`;
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const studentTimetable = await untis.getTimetableForWeek(
          new Date(),
          student.id,
          WebUntisElementType.STUDENT,
          2
        );

        if (!currentStudent) {
          const newUser = await ctx.prisma.user.create({
            data: {
              firstName: student.foreName,
              lastName: student.longName,
              name: student.name,
              email,
              password: hashedPassword,
              role: 'STUDENT',
            },
          });
          await ctx.prisma.student.create({
            data: {
              user: {
                connect: {
                  id: newUser.id,
                },
              },
            },
          });
        } else {
          await ctx.prisma.user.update({
            where: {
              id: currentStudent.user.id,
            },
            data: {
              firstName: student.foreName,
              lastName: student.longName,
              name: student.name,
              email,
            },
          });
        }
      });
    }

    await untis.logout();

    return loginData;
  }
}
