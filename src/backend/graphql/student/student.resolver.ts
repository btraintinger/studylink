/* eslint-disable @typescript-eslint/no-unused-vars */
import { Student, StudentInput } from './student.type';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import type { Context } from '../context';

@Resolver((of) => Student)
export class StudentResolver {
  @FieldResolver()
  async schoolClass(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .schoolClass({ select: { id: true, name: true } });
  }

  @FieldResolver()
  async tutorOfferings(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorOffering();
  }

  @FieldResolver()
  async tutorRequests(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .tutorRequest();
  }

  @FieldResolver()
  async user(@Root() student: Student, @Ctx() ctx: Context) {
    return await ctx.prisma.student
      .findUnique({
        where: { id: student.id },
      })
      .user();
  }

  @Authorized('STUDENT')
  @Query((returns) => Student)
  async getStudentOfCurrentUser(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    return await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
      select: { id: true },
    });
  }

  @Authorized('STUDENT')
  @Mutation((returns) => Student)
  async student(
    @Ctx() ctx: Context,
    @Arg('studentInput') StudentInput: StudentInput
  ) {
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
    });

    if (student) {
      return await ctx.prisma.student.update({
        where: { userId: ctx.user.id },
        data: {
          schoolClassId: StudentInput.schoolClassId,
        },
      });
    }

    return await ctx.prisma.student.create({
      data: {
        userId: ctx.user.id,
        schoolClassId: StudentInput.schoolClassId,
      },
    });
  }
}
