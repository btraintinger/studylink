import {
  TutorOffering,
  TutorOfferingInputCreation,
  TutorOfferingUpdateInput,
} from './tutorOffering.type';
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
  Arg,
} from 'type-graphql';
import type { Context } from '../context';

async function isTutorOfferingExistent(
  ctx: Context,
  tutorRequestId: number
): Promise<boolean> {
  const tutorRequest = await ctx.prisma.tutorRequest.findUnique({
    where: {
      id: tutorRequestId,
    },
    select: {
      id: true,
    },
  });

  return tutorRequest ? true : false;
}

async function isTutorOfferingtRelatedToUser(
  ctx: Context,
  tutorRequestId: number
): Promise<boolean> {
  return ctx.user?.student?.id === tutorRequestId;
}

@Resolver((of) => TutorOffering)
export class TutorOfferingResolver {
  @Authorized('STUDENT')
  @Query((returns) => TutorOffering)
  async getTutorOfferingById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorOfferingExistent(ctx, id)))
      throw new Error('Tutor request not found');
    if (!(await isTutorOfferingtRelatedToUser(ctx, id)))
      throw new Error('Tutor request not relatet to user');

    const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
      where: {
        id: id,
      },
    });

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async createTutorOffering(
    @Arg('TutorOfferingInputCreation')
    TutorOfferingInputCreation: TutorOfferingInputCreation,
    @Ctx() ctx: Context
  ) {
    const tutorOffering = await ctx.prisma.tutorOffering.create({
      data: {
        schoolClass: {
          connect: {
            id: TutorOfferingInputCreation.schoolClassId,
          },
        },
        schoolSubject: {
          connect: {
            id: TutorOfferingInputCreation.schoolSubjectId,
          },
        },
        student: {
          connect: {
            id: ctx.user?.student?.id,
          },
        },
        teacher: TutorOfferingInputCreation.teacher,
        description: TutorOfferingInputCreation.description,
      },
    });

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async updateOfferingRequest(
    @Arg('TutorOfferingUpdateInput')
    TutorOfferingUpdateInput: TutorOfferingUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isTutorOfferingExistent(ctx, TutorOfferingUpdateInput.id))) {
      throw new Error('TutorOffering does not exist');
    }

    if (
      !(await isTutorOfferingtRelatedToUser(ctx, TutorOfferingUpdateInput.id))
    ) {
      throw new Error('TutorOffering is not related to user');
    }

    const tutorOffering = await ctx.prisma.tutorOffering.update({
      where: {
        id: TutorOfferingUpdateInput.id,
      },
      data: {
        schoolClass: {
          connect: {
            id: TutorOfferingUpdateInput.schoolClassId,
          },
        },
        schoolSubject: {
          connect: {
            id: TutorOfferingUpdateInput.schoolSubjectId,
          },
        },
        teacher: TutorOfferingUpdateInput.teacher,
        description: TutorOfferingUpdateInput.description,
      },
    });

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async deleteTutorOffering(@Ctx() ctx: Context, @Arg('id') id: string) {
    const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
      where: {},
    });

    if (!tutorOffering) throw new Error('Tutor offering not found');

    if (
      ctx.user?.role === 'STUDENT' &&
      tutorOffering.studentId !== ctx.user?.student?.id
    ) {
      throw new Error('You are not authorized to delete this tutor offering');
    }

    const deletedTutorOffering = await ctx.prisma.tutorOffering.delete({
      where: { id: tutorOffering.id },
    });

    if (!deletedTutorOffering)
      throw new Error('Tutor offering could not be deleted');

    return deletedTutorOffering;
  }
}
