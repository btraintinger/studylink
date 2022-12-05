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
  @FieldResolver()
  async user(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({
      where: { id: user.id },
    });
  }
}
