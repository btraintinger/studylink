import {
  TutorRequest,
  TutorRequestCreationInput,
  TutorRequestUpdateInput,
} from './tutorRequest.type';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

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

  return !!tutorRequest;
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
  @FieldResolver()
  async schoolSubject(@Root() tutorRequest: TutorRequest, @Ctx() ctx: Context) {
    return await ctx.prisma.tutorRequest
      .findUnique({
        where: {
          id: tutorRequest.id,
        },
      })
      .schoolSubject();
  }

  @FieldResolver()
  async teacher(@Root() tutorRequest: TutorRequest, @Ctx() ctx: Context) {
    return await ctx.prisma.tutorRequest
      .findUnique({
        where: {
          id: tutorRequest.id,
        },
      })
      .teacher();
  }

  @Authorized('STUDENT')
  @Query((returns) => TutorRequest)
  async getTutorRequestById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorRequestExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isTutorRequestByUser(ctx, id)))
      throw new Error('NotAuthorizedError');

    const tutorRequest = await ctx.prisma.tutorRequest.findUnique({
      where: {
        id,
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
        grade: TutorRequestCreationInput.grade,
        schoolSubject: {
          connect: {
            id: TutorRequestCreationInput.schoolSubjectId,
          },
        },
        teacher: {
          connect: {
            id: TutorRequestCreationInput.teacherId,
          },
        },
        description: TutorRequestCreationInput.description,
        student: {
          connect: {
            id: ctx.user?.student?.id,
          },
        },
      },
    });

    if (!tutorRequest) throw new Error('CreationFailedError');

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
      throw new Error('DoesNotExistError');
    if (!(await isTutorRequestByUser(ctx, TutorRequestUpdateInput.id)))
      throw new Error('NotAuthorizedError');

    const tutorRequest = await ctx.prisma.tutorRequest.update({
      where: {
        id: TutorRequestUpdateInput.id,
      },
      data: {
        grade: TutorRequestUpdateInput.grade,
        schoolSubject: {
          connect: {
            id: TutorRequestUpdateInput.schoolSubjectId,
          },
        },
        teacher: {
          connect: {
            id: TutorRequestUpdateInput.teacherId,
          },
        },
        description: TutorRequestUpdateInput.description,
      },
    });

    if (!tutorRequest) throw new Error('UpdateFailedError');

    return tutorRequest;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorRequest)
  async deleteTutorRequest(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorRequestExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isTutorRequestByUser(ctx, id)))
      throw new Error('NotAuthorizedError');

    const tutorRequest = await ctx.prisma.tutorRequest.delete({
      where: {
        id,
      },
    });

    return tutorRequest;
  }
}
