import { SchoolClass, SchoolClassInput } from './schoolClass.type';
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
    const schoolClass = await ctx.prisma.schoolClass.findUnique({
      where: {
        id: id,
      },
    });
    const department = await ctx.prisma.department.findUnique({
      where: {
        id: schoolClass?.departmentId,
      },
      select: {
        schoolId: true,
      },
    });
    if (!schoolClass) throw new Error('SchoolClass not found');
    if (department?.schoolId !== ctx.user?.admin?.schoolId)
      throw new Error('Not authorized');

    return schoolClass;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => SchoolClass)
  async schoolClass(
    @Arg('schoolClass') schoolClassInput: SchoolClassInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user) throw new Error('Not logged in');

    const department = await ctx.prisma.department.findUnique({
      where: {
        id: schoolClassInput.departmentId,
      },
      select: {
        schoolId: true,
      },
    });

    if (ctx.user.admin?.schoolId !== department?.schoolId)
      throw new Error('Not authorized');

    let schoolClass = await ctx.prisma.schoolClass.findUnique({
      where: {
        id: schoolClassInput.id,
      },
    });

    if (!schoolClass) {
      schoolClass = await ctx.prisma.schoolClass.create({
        data: {
          id: schoolClassInput.id,
          name: schoolClassInput.name,
          departmentId: schoolClassInput.departmentId,
          grade: schoolClassInput.grade,
        },
      });
    } else {
      schoolClass = await ctx.prisma.schoolClass.update({
        where: {
          id: schoolClassInput.id,
        },
        data: {
          name: schoolClassInput.name,
        },
      });
    }

    return schoolClass;
  }
}
