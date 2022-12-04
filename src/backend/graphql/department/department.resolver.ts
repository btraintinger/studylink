import { Department } from './department.type';
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import type { Context } from '../context';

@Resolver((of) => Department)
export class DepartmentResolver {
  @FieldResolver()
  async school(@Root() department: Department, @Ctx() ctx: Context) {
    return ctx.prisma.department
      .findUnique({
        where: { id: department.id },
      })
      .school();
  }

  @FieldResolver()
  async schoolClasses(@Root() department: Department, @Ctx() ctx: Context) {
    return ctx.prisma.department
      .findUnique({
        where: { id: department.id },
      })
      .schoolClasses();
  }
}
