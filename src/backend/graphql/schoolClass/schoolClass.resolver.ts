import {
  SchoolClass,
  SchoolClassCreationInput,
  SchoolClassUpdateInput,
} from './schoolClass.type';
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

export async function isUserAdministratingSchoolClass(
  ctx: Context,
  schoolClassId: number
): Promise<boolean> {
  const schoolClass = await ctx.prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      department: {
        select: {
          school: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return ctx.user?.admin?.schoolId === schoolClass?.department?.school?.id;
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

  @FieldResolver()
  async students(@Root() schoolClass: SchoolClass, @Ctx() ctx: Context) {
    return await ctx.prisma.schoolClass
      .findUnique({
        where: { id: schoolClass.id },
      })
      .students();
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
  @Query((returns) => [SchoolClass])
  async getSchoolClassesOfSchool(@Ctx() ctx: Context) {
    if (!ctx.user?.admin?.schoolId) return [];

    const departments = await ctx.prisma.department.findMany({
      where: {
        schoolId: ctx.user?.admin?.schoolId,
      },
      select: {
        id: true,
      },
    });

    const schoolClasses: SchoolClass[] = [];

    for (const department of departments) {
      const classes = await ctx.prisma.schoolClass.findMany({
        where: {
          departmentId: department.id,
        },
      });
      schoolClasses.push(...(classes as SchoolClass[]));
    }

    return schoolClasses;
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
        longName: SchoolClassCreationInput.longName,
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
        longName: SchoolClassUpdateInput.longName,
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
