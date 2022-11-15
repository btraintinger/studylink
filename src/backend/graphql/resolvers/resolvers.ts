import { TutorOffering, Student, User, TutorRequest } from './../typeDefs/typeDefs';
import type { Context } from '../context';
import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from 'type-graphql';
import { GraphQLError } from 'graphql';

@Resolver()
export class StudylinkResolver {
  @Authorized('ADMIN','STUDENT')
  @Query((returns) => User)
  async getUser(@Ctx() ctx: Context) {
    return ctx.user;
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
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { user_id: ctx.user.id },
      include: {
        tutor_offering: {
          include: { school_class: true, school_subject: true, student: true },
        },
      },
    });

    return student?.tutor_offering;
  }


  @Authorized('USER')
  @Query((returns) => [TutorRequest])
  async getTutorRequests(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { user_id: ctx.user.id },
      include: {
        tutor_request: {
          include: { school_class: true, school_subject: true, student: true },
        },
      },
    });

    return student?.tutor_request;
  }


}
