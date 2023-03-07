import {
  TutorOffering,
  TutorOfferingInputCreation,
  TutorOfferingUpdateInput,
} from './tutorOffering.type';
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
import { notifyAvailableMatches } from '../../utils/notifyAvailableMatches';

async function isTutorOfferingExistent(
  ctx: Context,
  tutorOfferingId: number
): Promise<boolean> {
  const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
    where: {
      id: tutorOfferingId,
    },
    select: {
      id: true,
    },
  });

  return !!tutorOffering;
}

async function isTutorOfferingByUser(
  ctx: Context,
  tutorOfferingId: number
): Promise<boolean> {
  const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
    where: {
      id: tutorOfferingId,
    },
    select: {
      studentId: true,
    },
  });
  return ctx.user?.student?.id === tutorOffering?.studentId;
}

@Resolver((of) => TutorOffering)
export class TutorOfferingResolver {
  @FieldResolver()
  async schoolSubject(
    @Root() tutorOffering: TutorOffering,
    @Ctx() ctx: Context
  ) {
    return await ctx.prisma.tutorOffering
      .findUnique({
        where: {
          id: tutorOffering.id,
        },
      })
      .schoolSubject();
  }

  @FieldResolver()
  async teacher(@Root() tutorOffering: TutorOffering, @Ctx() ctx: Context) {
    return await ctx.prisma.tutorOffering
      .findUnique({
        where: {
          id: tutorOffering.id,
        },
      })
      .teacher();
  }

  @Authorized('STUDENT')
  @Query((returns) => TutorOffering)
  async getTutorOfferingById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!(await isTutorOfferingExistent(ctx, id)))
      throw new Error('DoesNotExistError');
    if (!(await isTutorOfferingByUser(ctx, id)))
      throw new Error('NotAuthorizedError');

    const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
      where: {
        id,
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
        teacher: {
          connect: {
            id: TutorOfferingInputCreation.teacherId,
          },
        },
        description: TutorOfferingInputCreation.description,
        grade: TutorOfferingInputCreation.grade,
      },
    });

    if (!tutorOffering) throw new Error('CreationFailedError');

    notifyAvailableMatches({
      tutorAction: tutorOffering,
      tutorActionType: 'OFFERING',
    });

    return tutorOffering;
  }

  @Authorized('STUDENT')
  @Mutation((returns) => TutorOffering)
  async updateTutorOffering(
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
        schoolSubject: {
          connect: {
            id: TutorOfferingUpdateInput.schoolSubjectId,
          },
        },
        teacher: {
          connect: {
            id: TutorOfferingUpdateInput.teacherId,
          },
        },
        description: TutorOfferingUpdateInput.description,
        grade: TutorOfferingUpdateInput.grade,
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
        id,
      },
    });

    return deletedTutorOffering;
  }
}
