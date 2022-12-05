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
import { School, SchoolInput } from './school.type';

@Resolver((of) => School)
export class SchoolResolver {
  @FieldResolver()
  async user(@Root() school: School, @Ctx() ctx: Context) {
    return ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .admins();
  }

  @FieldResolver()
  async departments(@Root() school: School, @Ctx() ctx: Context) {
    return ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .departments();
  }
}
