/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
  Arg,
} from 'type-graphql';
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

  return schoolSubject ? true : false;
}

@Resolver((of) => SchoolSubject)
export class SchoolSubjectResolver {
  @Authorized('ADMIN')
  @Query((returns) => SchoolSubject)
  async getSchoolSubjectById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolSubjectExistent(ctx, id))) {
      throw new Error('SchoolSubject does not exist');
    }

    const SchoolSubject = await ctx.prisma.schoolSubject.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Authorized('ADMIN')
  @Query((returns) => SchoolSubject)
  async createSchoolSubject(
    @Arg('SchoolSubjectCreationInput')
    SchoolSubjectCreationInput: SchoolSubjectCreationInput,
    @Ctx() ctx: Context
  ) {
    const SchoolSubject = await ctx.prisma.schoolSubject.create({
      data: {
        name: SchoolSubjectCreationInput.name,
        extendedName: SchoolSubjectCreationInput.extendedName,
      },
    });

    return SchoolSubject;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolSubject)
  async updateSchoolSubject(
    @Arg('id') id: number,
    @Arg('SchoolSubjectUpdateInput')
    SchoolSubjectUpdateInput: SchoolSubjectUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isSchoolSubjectExistent(ctx, id))) {
      throw new Error('SchoolSubject does not exist');
    }

    const SchoolSubject = await ctx.prisma.schoolSubject.update({
      where: {
        id: id,
      },
      data: {
        name: SchoolSubjectUpdateInput.name,
        extendedName: SchoolSubjectUpdateInput.extendedName,
      },
    });

    return SchoolSubject;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolSubject)
  async deleteSchoolSubject(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolSubjectExistent(ctx, id))) {
      throw new Error('SchoolSubject does not exist');
    }

    const SchoolSubject = await ctx.prisma.schoolSubject.delete({
      where: {
        id: id,
      },
    });

    return SchoolSubject;
  }
}
