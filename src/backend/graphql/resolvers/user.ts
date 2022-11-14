import type { Context } from './../context';
import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../typeDefs/user';

@Resolver()
export class UserResolver {
  @Query((returns) => User)
  async recipes(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;

    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    return user;
  }
}
