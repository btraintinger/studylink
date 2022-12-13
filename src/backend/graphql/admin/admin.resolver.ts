import { School } from './../school/school.type';
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
import { Admin } from './admin.type.';

@Resolver((of) => Admin)
export class AdminResolver {
  @FieldResolver()
  async user(@Root() admin: Admin, @Ctx() ctx: Context) {
    return await ctx.prisma.admin
      .findUnique({
        where: { id: admin.id },
      })
      .user();
  }

  @Authorized('ADMIN')
  @Query((returns) => Admin)
  async getAdminOfCurrentUser(@Ctx() ctx: Context) {
    if (ctx.user === null) return null;

    return await ctx.prisma.admin.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });
  }

  @Authorized('ADMIN')
  @Query((returns) => School)
  async getAdministeredSchool(@Ctx() ctx: Context) {
    if (ctx.user === null) return null;

    return await ctx.prisma.admin
      .findUnique({
        where: {
          userId: ctx.user.id,
        },
      })
      .school();
  }
}
