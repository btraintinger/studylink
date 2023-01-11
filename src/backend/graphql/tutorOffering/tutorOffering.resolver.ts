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

async function isTutorOfferingByUser(
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

@Resolver((of) => TutorOffering)
export class TutorOfferingResolver {
  @Authorized('STUDENT')
  @Query((returns) => TutorOffering)
  async getTutorOfferingById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorOfferingExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isTutorOfferingByUser(ctx, id)))
      throw new Error('NotAuthorizedError');

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

    if (!tutorOffering) throw new Error('CreationFailedError');

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async updateOfferingRequest(
    @Arg('TutorOfferingUpdateInput')
    TutorOfferingUpdateInput: TutorOfferingUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!(await isTutorOfferingExistent(ctx, TutorOfferingUpdateInput.id)))
      throw new Error('DoesNotExistError');
    if (!(await isTutorOfferingByUser(ctx, TutorOfferingUpdateInput.id)))
      throw new Error('NotAuthorizedError');

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

    if (!tutorOffering) throw new Error('UpdateFailedError');

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async deleteTutorOffering(@Ctx() ctx: Context, @Arg('id') id: number) {
    if (!(await isTutorOfferingExistent(ctx, Number(id))))
      throw new Error('DoesNotExistError');
    if (!(await isTutorOfferingByUser(ctx, Number(id))))
      throw new Error('NotAuthorizedError');

    const deletedTutorOffering = await ctx.prisma.tutorOffering.delete({
      where: {
        id: id,
      },
    });

    return deletedTutorOffering;
  }
}
