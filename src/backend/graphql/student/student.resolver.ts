import { SchoolSubject } from './../schoolSubject/schoolSubject.type';
import { Teacher } from './../teacher/teacher.type';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { generatePassword } from '../../utils/passwordGenerator';
import type { Context } from '../context';
import {
  Student,
  StudentCreationInput,
  StudentUpdateInput,
} from './student.type';
import { isUserAdministratingSchoolClass } from '../schoolClass/schoolClass.resolver';

async function isStudentExistent(
  ctx: Context,
  studentId: number
): Promise<boolean> {
  const student = await ctx.prisma.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      id: true,
    },
  });

  return !!student;
}

async function isUserAdministratingStudent(
  ctx: Context,
  studentId: number
): Promise<boolean> {
  const student = await ctx.prisma.student.findUnique({
    where: {
      id: studentId,
    },
    select: {
      schoolClass: {
        select: {
          department: {
            select: {
              schoolId: true,
            },
          },
        },
      },
    },
  });
  return (
    ctx.user?.admin?.schoolId === student?.schoolClass?.department.schoolId
  );
}

@Resolver((of) => Student)
export class StudentResolver {
  @FieldResolver()
  async tutorOfferings(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorOfferings();
  }

  @FieldResolver()
  async tutorRequests(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorRequests();
  }

  @FieldResolver()
  async user(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .user();
  }

  @Authorized('STUDENT')
  @Query((returns) => Student)
  async getStudentOfCurrentUser(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!student) throw new Error('DoesNotExistError');

    return student;
  }

  @Authorized('ADMIN')
  @Query((returns) => Student)
  async getStudentById(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isStudentExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingStudent(ctx, id)))
      throw new Error('NotAuthorizedError');

    return await ctx.prisma.student.findUnique({
      where: { id },
    });
  }

  @Authorized('STUDENT')
  @Query((returns) => [SchoolSubject])
  async getSubjectsOfStudent(@Ctx() ctx: Context) {
    const dbQuery = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user?.id },
      select: {
        schoolClass: {
          include: {
            classHasSubject: {
              include: {
                schoolSubject: true,
              },
            },
          },
        },
      },
    });

    return dbQuery?.schoolClass?.classHasSubject.map(
      (classHasSubject) => classHasSubject.schoolSubject as SchoolSubject
    );
  }

  @Authorized('STUDENT')
  @Query((returns) => [Teacher])
  async getTeachersOfStudent(@Ctx() ctx: Context) {
    const dbQuery = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user?.id },
      select: {
        schoolClass: {
          include: {
            department: {
              include: {
                school: {
                  include: {
                    teachers: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return dbQuery?.schoolClass?.department.school.teachers;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async createStudent(
    @Ctx() ctx: Context,
    @Arg('studentInput') studentInput: StudentCreationInput
  ) {
    if (
      !(await isUserAdministratingSchoolClass(ctx, studentInput.schoolClassId))
    )
      throw new Error('NotAuthorizedError');

    if (
      await ctx.prisma.user.findUnique({ where: { email: studentInput.email } })
    )
      throw new Error('AlreadyExistsError');

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentUser = await ctx.prisma.user.create({
      data: {
        email: studentInput.email,
        password: hashedPassword,
        name: studentInput.name,
        firstName: studentInput.firstName,
        lastName: studentInput.lastName,
        role: 'STUDENT',
      },
    });

    if (!studentUser) throw new Error('CreationFailedError');

    const student = await ctx.prisma.student.create({
      data: {
        user: {
          connect: {
            id: studentUser.id,
          },
        },
        schoolClass: {
          connect: {
            id: studentInput.schoolClassId,
          },
        },
      },
    });

    if (!student) {
      await ctx.prisma.user.delete({
        where: {
          id: studentUser.id,
        },
      });
      throw new Error('CreationFailedError');
    }

    return student;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async updateStudent(
    @Ctx() ctx: Context,
    @Arg('studentInput') StudentInput: StudentUpdateInput
  ) {
    if (!(await isStudentExistent(ctx, StudentInput.id)))
      throw new Error('DoesNotExistError');

    if (!(await isUserAdministratingStudent(ctx, StudentInput.id)))
      throw new Error('NotAuthorizedError');

    if (
      !(await isUserAdministratingSchoolClass(ctx, StudentInput.schoolClassId))
    )
      throw new Error('NotAuthorizedError');

    const student = await ctx.prisma.student.update({
      where: {
        id: StudentInput.id,
      },
      data: {
        schoolClass: {
          connect: {
            id: StudentInput.schoolClassId,
          },
        },
      },
    });

    const studentUser = await ctx.prisma.user.update({
      where: {
        id: student.userId,
      },
      data: {
        email: StudentInput.email,
        name: StudentInput.name,
      },
    });

    if (!studentUser) throw new Error('UpdateFailedError');
    if (!student) throw new Error('UpdateFailedError');

    return student;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async deleteStudent(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isStudentExistent(ctx, id)))
      throw new Error('DoesNotExistError');

    if (!(await isUserAdministratingStudent(ctx, id)))
      throw new Error('NotAuthorizedError');

    return await ctx.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
