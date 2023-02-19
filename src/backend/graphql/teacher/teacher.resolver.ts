import { FieldResolver, Mutation, Root } from 'type-graphql';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import {
  Teacher,
  TeacherCreationInput,
  TeacherUpdateInput,
} from './teacher.type';

async function isUserAdministratingTeacher(
  ctx: Context,
  teacherId: number
): Promise<boolean> {
  const teacher = await ctx.prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },
    select: {
      schoolId: true,
    },
  });
  return ctx.user?.admin?.schoolId === teacher?.schoolId;
}

async function isTeacherExistent(
  ctx: Context,
  teacherId: number
): Promise<boolean> {
  const teacher = await ctx.prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },
    select: {
      id: true,
    },
  });
  return !!teacher;
}

@Resolver((of) => Teacher)
export class TeacherResolver {
  @FieldResolver()
  async schoolSubjects(@Root() teacher: Teacher, @Ctx() ctx: Context) {
    const teacherData = await ctx.prisma.teacher
      .findUnique({
        where: {
          id: teacher.id,
        },
      })
      .lessons({ include: { schoolSubject: true } });

    return teacherData?.map((lesson) => lesson.schoolSubject) || [];
  }

  @Authorized('STUDENT', 'ADMIN')
  @Query((returns) => Teacher)
  async getTeacherById(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isTeacherExistent(ctx, id))) {
      throw new Error('DoesNotExistError');
    }
    if (!(await isUserAdministratingTeacher(ctx, id)))
      throw new Error('NotAuthorizedError');

    return await ctx.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Teacher)
  async createTeacher(
    @Ctx() ctx: Context,
    @Arg('teacherCreationInput') TeacherCreationInput: TeacherCreationInput
  ) {
    if (!ctx.user?.admin?.schoolId) throw new Error('NoSchoolError');

    return await ctx.prisma.teacher.create({
      data: {
        name: TeacherCreationInput.name,
        longName: TeacherCreationInput.longName,
        school: {
          connect: {
            id: ctx.user.admin.schoolId,
          },
        },
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Teacher)
  async updateTeacher(
    @Ctx() ctx: Context,
    @Arg('teacherUpdateInput') teacherUpdateInput: TeacherUpdateInput
  ) {
    if (!(await isTeacherExistent(ctx, teacherUpdateInput.id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingTeacher(ctx, teacherUpdateInput.id)))
      throw new Error('NotAuthorizedError');

    return await ctx.prisma.teacher.update({
      where: {
        id: teacherUpdateInput.id,
      },
      data: {
        name: teacherUpdateInput.name,
        longName: teacherUpdateInput.longName,
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Teacher)
  async deleteTeacher(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isTeacherExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingTeacher(ctx, id)))
      throw new Error('NotAuthorizedError');

    return await ctx.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }
}
