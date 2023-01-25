import { User, UserUpdateInput } from './user.type';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';

@Resolver((of) => User)
export class UserResolver {
  @Authorized('ADMIN', 'STUDENT')
  @Query((returns) => User)
  async getCurrentUser(@Ctx() ctx: Context) {
    if (!ctx.user) throw new Error('NotAuthorizedError');

    return await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => User)
  async updateUser(
    @Ctx() ctx: Context,
    @Arg('userUpdateInput') userUpdateInput: UserUpdateInput
  ) {
    if (!ctx.user) throw new Error('NotAuthorizedError');

    return await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        name: userUpdateInput.name,
        email: userUpdateInput.email,
      },
    });
  }
}
