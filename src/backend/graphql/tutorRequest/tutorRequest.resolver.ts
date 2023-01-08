import {
  TutorRequest,
  TutorRequestCreationInput,
  TutorRequestUpdateInput,
} from './tutorRequest.type';
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

async function isTutorRequestExistent(
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

async function isTutorRequestByUser(
  ctx: Context,
  tutorRequestId: number
): Promise<boolean> {
  const tutorRequest = await ctx.prisma.tutorRequest.findUnique({
    where: {
      id: tutorRequestId,
    },
    select: {
      studentId: true,
    },
  });
  return ctx.user?.student?.id === tutorRequest?.studentId;
}

@Resolver((of) => TutorRequest)
export class TutorRequestResolver {
  @Authorized('STUDENT')
  @Query((returns) => TutorRequest)
  async getTutorRequestById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorRequestExistent(ctx, id)))
      throw new Error('TutorRequest does not exist');
    if (!(await isTutorRequestByUser(ctx, id)))
      throw new Error('TutorRequest was not created by user');

    const tutorRequest = await ctx.prisma.tutorRequest.findUnique({
      where: {
        id: id,
      },
    });

    return tutorRequest;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorRequest)
  async createTutorRequest(
    @Arg('TutorRequestCreationInput')
    TutorRequestCreationInput: TutorRequestCreationInput,
    @Ctx() ctx: Context
  ) {
    const tutorRequest = await ctx.prisma.tutorRequest.create({
      data: {
        schoolClass: {
          connect: {
            id: TutorRequestCreationInput.schoolClassId,
          },
        },
        schoolSubject: {
          connect: {
            id: TutorRequestCreationInput.schoolSubjectId,
          },
        },
        teacher: TutorRequestCreationInput.teacher,
        description: TutorRequestCreationInput.description,
        student: {
          connect: {
            id: ctx.user?.student?.id,
          },
        },
      },
    });

    return tutorRequest;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorRequest)
  async updateTutorRequest(
    @Arg('TutorRequestUpdateInput')
    TutorRequestUpdateInput: TutorRequestUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isTutorRequestExistent(ctx, TutorRequestUpdateInput.id)))
      throw new Error('TutorRequest does not exist');
    if (!(await isTutorRequestByUser(ctx, TutorRequestUpdateInput.id)))
      throw new Error('TutorRequest is not related to user');

    const tutorRequest = await ctx.prisma.tutorRequest.update({
      where: {
        id: TutorRequestUpdateInput.id,
      },
      data: {
        schoolClass: {
          connect: {
            id: TutorRequestUpdateInput.schoolClassId,
          },
        },
        schoolSubject: {
          connect: {
            id: TutorRequestUpdateInput.schoolSubjectId,
          },
        },
        teacher: TutorRequestUpdateInput.teacher,
        description: TutorRequestUpdateInput.description,
      },
    });

    return tutorRequest;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorRequest)
  async deleteTutorRequest(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorRequestExistent(ctx, id)))
      throw new Error('TutorRequest does not exist');
    if (!(await isTutorRequestByUser(ctx, id)))
      throw new Error('TutorRequest is not related to user');

    const tutorRequest = await ctx.prisma.tutorRequest.delete({
      where: {
        id: id,
      },
    });

    if (!tutorRequest) throw new Error('TutorRequest could not be deleted');

    return tutorRequest;
  }
}
