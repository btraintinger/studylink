/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Context } from '../context';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { TutorRequest, TutorRequestInput } from '../typeDefs/tutorRequest';
import { TutorOffering, TutorOfferingInput } from '../typeDefs/tutorOffer';
import { School, SchoolInput } from '../typeDefs/school';
import { Student, StudentInput } from '../typeDefs/student';

@Resolver()
export class MutationResolver {
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
