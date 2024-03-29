/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import {
  SchoolSubject,
  SchoolSubjectCreationInput,
  SchoolSubjectUpdateInput,
} from './schoolSubject.type';

async function isSchoolSubjectExistent(
  ctx: Context,
  schoolSubjectId: number
): Promise<boolean> {
  const schoolSubject = await ctx.prisma.schoolSubject.findUnique({
    where: {
      id: schoolSubjectId,
    },
    select: {
      id: true,
    },
  });

  return !!schoolSubject;
}

async function isUserAdministratingSchoolSubject(
  ctx: Context,
  schoolClassId: number
): Promise<boolean> {
  const schoolClass = await ctx.prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    include: {
      department: {
        select: {
          schoolId: true,
        },
      },
    },
  });
  return ctx.user?.admin?.schoolId === schoolClass?.department.schoolId;
}

@Resolver((of) => SchoolSubject)
export class SchoolSubjectResolver {
  @Authorized('ADMIN')
  @Query((returns) => SchoolSubject)
  async getSchoolSubjectById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolSubjectExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchoolSubject(ctx, id)))
      throw new Error('NotAuthorizedError');

    const schoolSubject = await ctx.prisma.schoolSubject.findUnique({
      where: {
        id,
      },
    });

    if (!schoolSubject) throw new Error('SchoolSubject does not exist');

    return schoolSubject;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolSubject)
  async createSchoolSubject(
    @Arg('SchoolSubjectCreationInput')
    SchoolSubjectCreationInput: SchoolSubjectCreationInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user?.admin?.schoolId) throw new Error('NoSchoolError');

    const schoolSubject = await ctx.prisma.schoolSubject.create({
      data: {
        name: SchoolSubjectCreationInput.name,
        longName: SchoolSubjectCreationInput.longName,
        school: {
          connect: {
            id: ctx.user.admin.schoolId,
          },
        },
      },
    });

    if (!schoolSubject) throw new Error('CreationFailedError');

    return schoolSubject;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolSubject)
  async updateSchoolSubject(
    @Arg('SchoolSubjectUpdateInput')
    SchoolSubjectUpdateInput: SchoolSubjectUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isSchoolSubjectExistent(ctx, SchoolSubjectUpdateInput.id)))
      throw new Error('DoesNotExistError');

    if (
      !(await isUserAdministratingSchoolSubject(
        ctx,
        SchoolSubjectUpdateInput.id
      ))
    )
      throw new Error('NotAuthorizedError');

    const schoolSubject = await ctx.prisma.schoolSubject.update({
      where: {
        id: SchoolSubjectUpdateInput.id,
      },
      data: {
        name: SchoolSubjectUpdateInput.name,
        longName: SchoolSubjectUpdateInput.longName,
      },
    });

    if (!schoolSubject) throw new Error('UpdateFailedError');

    return schoolSubject;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolSubject)
  async deleteSchoolSubject(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolSubjectExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchoolSubject(ctx, id)))
      throw new Error('NotAuthorizedError');

    const schoolSubject = await ctx.prisma.schoolSubject.delete({
      where: {
        id,
      },
    });

    return schoolSubject;
  }
}
