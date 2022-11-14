import { TutorOffering, Student, User } from './../typeDefs/typeDefs';
import type { Context } from '../context';
import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class StudylinkResolver {
  @Query((returns) => User)
  async recipes(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;

    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
    });

    return user;
  }

  @Authorized('ADMIN')
  @Query((returns) => User)
  async getUserById(@Arg('id') id: string) {
    return await prisma.user.findUnique({
      where: { id: id },
    });
  }

  @Authorized('USER')
  @Query((returns) => [TutorOffering])
  async getTutorOfferings(@Ctx() ctx: Context) {
    if (!ctx.userId) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { user_id: ctx.userId },
      include: {
        tutor_offering: {
          include: { school_class: true, school_subject: true, student: true },
        },
      },
    });

    return student?.tutor_offering;
  }
}
