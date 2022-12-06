import { Department, DepartmentInput } from './department.type';
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

@Resolver((of) => Department)
export class DepartmentResolver {
  @FieldResolver()
  async schoolClasses(@Root() department: Department, @Ctx() ctx: Context) {
    return await ctx.prisma.department
      .findUnique({
        where: { id: department.id },
      })
      .schoolClasses();
  }

  @Query((returns) => Department)
  async getDepartmentById(@Arg('id') id: number, @Ctx() ctx: Context) {
    const department = await ctx.prisma.department.findUnique({
      where: {
        id: id,
      },
    });

    if (!department) throw new Error('Department not found');
    if (department.schoolId !== ctx.user?.admin?.schoolId)
      throw new Error('Not authorized');

    return department;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Department)
  async department(
    @Arg('department') departmentInput: DepartmentInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user) throw new Error('Not logged in');

    if (ctx.user.admin?.schoolId !== departmentInput.schoolId)
      throw new Error('Not authorized');

    let department = await ctx.prisma.department.findUnique({
      where: {
        id: departmentInput.id,
      },
    });

    if (!department) {
      department = await ctx.prisma.department.create({
        data: {
          id: departmentInput.id,
          name: departmentInput.name,
          schoolId: departmentInput.schoolId,
        },
      });
    } else {
      department = await ctx.prisma.department.update({
        where: {
          id: departmentInput.id,
        },
        data: {
          name: departmentInput.name,
        },
      });
    }

    return department;
  }
}
