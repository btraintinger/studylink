import { SchoolSubject } from './../schoolSubject/schoolSubject.type';
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
import { sendPasswordToStudent } from '../../utils/mailer';
import { generatePassword } from '../../utils/passwordGenerator';
import type { Context } from '../context';
import {
  Student,
  StudentCreationInput,
  StudentUpdateInput,
} from './student.type';

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
  async schoolClass(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .schoolClass({ select: { id: true, name: true } });
  }

  @FieldResolver()
  async tutorOfferings(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorOffering();
  }

  @FieldResolver()
  async tutorRequests(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorRequest();
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
      select: { id: true },
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

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async createStudent(
    @Ctx() ctx: Context,
    @Arg('studentInput') studentInput: StudentCreationInput
  ) {
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentUser = await ctx.prisma.user.create({
      data: {
        email: studentInput.email,
        password: hashedPassword,
        name: studentInput.name,
        role: 'STUDENT',
      },
    });

    if (!studentUser) throw new Error('Student user could not be created');

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

    sendPasswordToStudent(student.id, password);
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
