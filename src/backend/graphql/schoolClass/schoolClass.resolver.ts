import {
  SchoolClass,
  SchoolClassUpdateInput,
  SchoolClassCreationInput,
} from './schoolClass.type';
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

async function isUserAdministratingSchoolClass(
  ctx: Context,
  schoolClassId: number
): Promise<boolean> {
  return ctx.user?.admin?.schoolId === schoolClassId;
}

async function isSchoolClassExistent(
  ctx: Context,
  schoolClassId: number
): Promise<boolean> {
  const schoolClass = await ctx.prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      id: true,
    },
  });

  return !!schoolClass;
}

@Resolver((of) => SchoolClass)
export class SchoolClassResolver {
  @FieldResolver()
  async schoolSubjects(@Root() schoolClass: SchoolClass, @Ctx() ctx: Context) {
    const classHasSubjects = await ctx.prisma.schoolClass
      .findUnique({
        where: { id: schoolClass.id },
      })
      .classHasSubject({ include: { schoolSubject: true } });

    if (!classHasSubjects) return [];

    return classHasSubjects.map(
      (classHasSubject) => classHasSubject.schoolSubject
    );
  }

  @Authorized('ADMIN')
  @Query((returns) => SchoolClass)
  async getSchoolClassById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolClassExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchoolClass(ctx, id)))
      throw new Error('NotAuthorizedError');

    const schoolClass = await ctx.prisma.schoolClass.findUnique({
      where: {
        id,
      },
    });

    return schoolClass;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolClass)
  async createSchoolClass(
    @Arg('schoolClassCreateInput')
    SchoolClassCreationInput: SchoolClassCreationInput,
    @Ctx() ctx: Context
  ) {
    const schoolClass = await ctx.prisma.schoolClass.create({
      data: {
        name: SchoolClassCreationInput.name,
        grade: SchoolClassCreationInput.grade,
        department: {
          connect: {
            id: SchoolClassCreationInput.departmentId,
          },
        },
      },
    });

    if (!schoolClass) throw new Error('CreationFailedError');

    return schoolClass;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolClass)
  async updateSchoolClass(
    @Arg('schoolClassUpdateInput')
    SchoolClassUpdateInput: SchoolClassUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isSchoolClassExistent(ctx, SchoolClassUpdateInput.id)))
      throw new Error('DoesNotExistError');
    if (
      !(await isUserAdministratingSchoolClass(ctx, SchoolClassUpdateInput.id))
    )
      throw new Error('NotAuthorizedError');

    const schoolClass = await ctx.prisma.schoolClass.update({
      where: {
        id: SchoolClassUpdateInput.id,
      },
      data: {
        name: SchoolClassUpdateInput.name,
        grade: SchoolClassUpdateInput.grade,
      },
    });

    if (!schoolClass) throw new Error('UpdateFailedError');

    return schoolClass;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolClass)
  async deleteSchoolClass(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isSchoolClassExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isUserAdministratingSchoolClass(ctx, id)))
      throw new Error('NotAuthorizedError');

    const schoolClass = await ctx.prisma.schoolClass.delete({
      where: {
        id,
      },
    });

    return schoolClass;
  }
}
