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
  async getUserById(@Arg('id') id: number) {
    return await prisma.user.findUnique({
      where: { id: id },
    });
  }

  @Authorized('USER')
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

  @Authorized('USER')
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
    @Arg('tutorRequestInput') tutorRequestInput: TutorRequestInput
  ) {
    return await prisma.tutorRequest.create({
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
    @Arg('tutorOfferingInput') tutorOfferingInput: TutorOfferingInput
  ) {
    return await prisma.tutorOffering.create({
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
  async createSchool(@Arg('schoolInput') SchoolInput: SchoolInput) {
    return await prisma.school.create({
      data: {
        name: SchoolInput.name,
      },
    });
  }
  //createStudent
  @Mutation((returns) => Student)
  async createStudent(@Arg('studentInput') StudentInput: StudentInput) {
    return await prisma.student.create({
      data: {
        userId: StudentInput.userId,
        schoolClassId: StudentInput.schoolClassId,
      },
    });
  }
  //deleteTutorRequest
  @Mutation((returns) => TutorRequest)
  async deleteTutorRequest(@Arg('id') id: number) {
    return await prisma.tutorRequest.delete({
      where: { id: id },
    });
  }

  @Mutation((returns) => Student)
  async updateStudent(@Arg('student') StudentInput: StudentInput) {
    return await prisma.student.update({
      where: { id: StudentInput.id },
      data: {
        userId: StudentInput.userId,
        schoolClassId: StudentInput.schoolClassId,
      },
    });
  }
}
