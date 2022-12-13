import { User } from './user.type';
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

@Resolver((of) => User)
export class UserResolver {
  @Authorized('ADMIN', 'STUDENT')
  @Query((returns) => User)
  async getCurrentUser(@Ctx() ctx: Context) {
    if (!ctx.user) throw new Error('Not logged in');

    return await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
    });
  }
}
