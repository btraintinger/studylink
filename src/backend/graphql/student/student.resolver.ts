/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Student,
  StudentCreationInput,
  StudentUpdateInput,
} from './student.type';
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
import bcrypt from 'bcrypt';
import type { Context } from '../context';

function generatePassword(
  length = 20,
  passwordChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
): string {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => passwordChars[x % passwordChars.length])
    .join('');
}

function sendPasswordToStudent(
  ctx: Context,
  studentId: number,
  password: string
) {
  console.log('TODO');
}

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

  return student ? true : false;
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

    if (!student) throw new Error('Student not found');

    return student;
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
      throw new Error('Student could not be created');
    }

    sendPasswordToStudent(ctx, student.id, password);
    return student;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async updateStudent(
    @Ctx() ctx: Context,
    @Arg('studentInput') StudentInput: StudentUpdateInput
  ) {
    if (!(await isStudentExistent(ctx, StudentInput.id)))
      throw new Error('Student not found');

    if (!(await isUserAdministratingStudent(ctx, StudentInput.id)))
      throw new Error('User is not administrating student');

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

    if (!studentUser) throw new Error('Student user could not be updated');
    if (!student) throw new Error('Student could not be updated');

    return student;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Student)
  async deleteStudent(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isStudentExistent(ctx, id)))
      throw new Error('Student not found');

    if (!(await isUserAdministratingStudent(ctx, id)))
      throw new Error('User is not administrating student');

    return await ctx.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
