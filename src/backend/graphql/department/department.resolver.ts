import {
  Department,
  DepartmentCreateInput,
  DepartmentUpdateInput,
} from './department.type';
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

async function isUserAdministratingDepartment(
  ctx: Context,
  departmentId: number
): Promise<boolean> {
  const department = await ctx.prisma.department.findUnique({
    where: {
      id: departmentId,
    },
    select: {
      schoolId: true,
    },
  });
  return ctx.user?.admin?.schoolId === department?.schoolId;
}

async function isDepartmentExistent(
  ctx: Context,
  departmentId: number
): Promise<boolean> {
  const department = await ctx.prisma.department.findUnique({
    where: {
      id: departmentId,
    },
    select: {
      id: true,
    },
  });

  return department ? true : false;
}

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
    if (!(await isUserAdministratingDepartment(ctx, id)))
      throw new Error('Not authorized');

    const department = await ctx.prisma.department.findUnique({
      where: {
        id: id,
      },
    });

    if (!department) throw new Error('Department not found');
    return department;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Department)
  async createDepartment(
    @Arg('departmentInput') input: DepartmentCreateInput,
    @Ctx() ctx: Context
  ) {
    if (input.schoolId !== ctx.user?.admin?.schoolId)
      throw new Error('Not authorized');

    const department = await ctx.prisma.department.create({
      data: {
        name: input.name,
        schoolId: input.schoolId,
      },
    });

    if (!department) throw new Error('Department could not be created');

    return department;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => Department)
  async updateDepartment(
    @Arg('departmentInput') input: DepartmentUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isUserAdministratingDepartment(ctx, input.id)))
      throw new Error('Not authorized');

    if (!(await isDepartmentExistent(ctx, input.id)))
      throw new Error('Department does not exist');

    const department = await ctx.prisma.department.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });

    if (!department) throw new Error('Department could not be updated');
    return department;
  }
}
