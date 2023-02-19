/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
import type { Context } from '../context';
import { Student } from '../student/student.type';
import { School, SchoolCreationInput, SchoolUpdateInput } from './school.type';

async function isUserAdministratingSchool(
  ctx: Context,
  schoolId: number
): Promise<boolean> {
  return ctx.user?.admin?.schoolId === schoolId;
}

async function isSchoolExistent(
  ctx: Context,
  schoolId: number
): Promise<boolean> {
  const school = await ctx.prisma.school.findUnique({
    where: {
      id: schoolId,
    },
    select: {
      id: true,
    },
  });

  return !!school;
}

@Resolver((of) => School)
export class SchoolResolver {
  @FieldResolver()
  async admins(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .admins();
  }

  @FieldResolver()
  async departments(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .departments();
  }

  @FieldResolver()
  async teachers(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .teachers();
  }

  @FieldResolver()
  async schoolSubjects(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .schoolSubjects();
  }

  @Authorized('ADMIN')
  @Query((returns) => School)
  async getSchoolById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchool(ctx, id)))
      throw new Error('NotAuthorizedError');
    const school = await ctx.prisma.school.findUnique({
      where: {
        id,
      },
    });

    return school;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => School)
  async createSchool(
    @Arg('schoolCreationInput') schoolCreationInput: SchoolCreationInput,
    @Ctx() ctx: Context
  ) {
    if (ctx.user?.admin?.schoolId)
      throw new Error('AlreadyAdministratingSchoolError');

    const school = await ctx.prisma.school.create({
      data: {
        name: schoolCreationInput.name,
        domain: schoolCreationInput.domain,
        admins: {
          connect: {
            id: ctx.user?.admin?.id,
          },
        },
      },
    });

    if (!school) throw new Error('CreationFailedError');
    return school;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => School)
  async updateSchool(
    @Arg('schoolUpdateInput') schoolUpdateInput: SchoolUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isSchoolExistent(ctx, schoolUpdateInput.id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchool(ctx, schoolUpdateInput.id)))
      throw new Error('NotAuthorizedError');

    const school = await ctx.prisma.school.update({
      where: {
        id: schoolUpdateInput.id,
      },
      data: {
        domain: schoolUpdateInput.domain,
        name: schoolUpdateInput.name,
      },
    });

    if (!school) throw new Error('UpdateFailedError');
    return school;
  }

  @Mutation((returns) => School)
  async deleteSchool(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchool(ctx, id)))
      throw new Error('NotAuthorizedError');

    const school = await ctx.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        admins: true,
      },
    });

    if (!school) throw new Error('DoesNotExistError');

    await ctx.prisma.school.update({
      where: {
        id,
      },
      data: {
        admins: {
          disconnect: {
            id: ctx.user?.admin?.id,
          },
        },
      },
    });

    const admins = school.admins;
    if (admins.length > 1) {
      return school;
    }

    await ctx.prisma.school.delete({
      where: {
        id,
      },
    });

    return school;
  }

  @Authorized('STUDENT')
  @Query((returns) => School)
  async getSchoolOfOwnStudent(@Ctx() ctx: Context) {
    const schoolClassId = ctx.user?.student?.schoolClassId;
    if (!schoolClassId) throw new Error('NoSchoolClassError');

    const schoolClass = await ctx.prisma.schoolClass.findUnique({
      where: {
        id: schoolClassId,
      },
      include: {
        department: {
          include: {
            school: true,
          },
        },
      },
    });

    return schoolClass?.department?.school;
  }
}
