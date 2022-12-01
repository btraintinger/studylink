/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TutorOffering,
  Student,
  User,
  TutorRequest,
  TutorRequestInput,
  TutorOfferingInput,
  School,
  SchoolInput,
  StudentInput,
} from './../typeDefs/typeDefs';
import type { Context } from '../context';
import { Arg, Authorized, Ctx, Query, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class StudylinkResolver {
  @Authorized('ADMIN', 'STUDENT')
  @Query((returns) => User)
  async getUser(@Ctx() ctx: Context) {
    return ctx.user;
  }

  @Authorized('ADMIN')
  @Query((returns) => User)
  async getUserById(@Ctx() ctx: Context, @Arg('id') id: string) {
    return await ctx.prisma.user.findUnique({
      where: { id: id },
    });
  }

  @Authorized('STUDENT')
  @Query((returns) => [TutorOffering])
  async getTutorOfferings(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
      include: {
        tutorOffering: {
          include: { schoolClass: true, schoolSubject: true, student: true },
        },
      },
    });

    return student?.tutorOffering;
  }

  @Authorized('STUDENT')
  @Query((returns) => [TutorRequest])
  async getTutorRequests(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    const student = await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
      include: {
        tutorRequest: {
          include: {
            schoolClass: {
              include: {
                classHasSubject: {
                  include: {
                    schoolSubject: true,
                  },
                },
              },
            },
            schoolSubject: true,
            student: true,
          },
        },
      },
    });

    return student?.tutorRequest;
  }

  @Mutation((returns) => TutorRequest)
  async createTutorRequest(
    @Ctx() ctx: Context,
    @Arg('tutorRequestInput') tutorRequestInput: TutorRequestInput
  ) {
    return await ctx.prisma.tutorRequest.create({
      data: {
        studentId: tutorRequestInput.studentId,
        schoolClassId: tutorRequestInput.schoolClassId,
        schoolSubjectId: tutorRequestInput.schoolSubjectId,
        teacher: tutorRequestInput.teacher,
        description: tutorRequestInput.description,
      },
    });
  }

  //createTutorOffering
  @Mutation((returns) => TutorOffering)
  async createTutorOffering(
    @Ctx() ctx: Context,
    @Arg('tutorOfferingInput') tutorOfferingInput: TutorOfferingInput
  ) {
    return await ctx.prisma.tutorOffering.create({
      data: {
        studentId: tutorOfferingInput.studentId,
        schoolClassId: tutorOfferingInput.schoolClassId,
        schoolSubjectId: tutorOfferingInput.schoolSubjectId,
        teacher: tutorOfferingInput.teacher,
        description: tutorOfferingInput.description,
      },
    });
  }
  //createSchool
  @Mutation((returns) => School)
  async createSchool(
    @Ctx() ctx: Context,
    @Arg('schoolInput') SchoolInput: SchoolInput
  ) {
    return await ctx.prisma.school.create({
      data: {
        name: SchoolInput.name,
      },
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

  //deleteTutorRequest
  @Mutation((returns) => TutorRequest)
  async deleteTutorRequest(@Ctx() ctx: Context, @Arg('id') id: number) {
    return await ctx.prisma.tutorRequest.delete({
      where: { id: id },
    });
  }
}
