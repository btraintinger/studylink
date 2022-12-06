import { TutorOffering, TutorOfferingInput } from './tutorOffering.type';
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

@Resolver((of) => TutorOffering)
export class TutorOfferingResolver {
  @FieldResolver()
  async schoolClass(@Root() tutorOffering: TutorOffering, @Ctx() ctx: Context) {
    return await ctx.prisma.tutorOffering
      .findUnique({
        where: { id: tutorOffering.id },
      })
      .schoolClass();
  }

  @FieldResolver()
  async schoolSubject(
    @Root() tutorOffering: TutorOffering,
    @Ctx() ctx: Context
  ) {
    return await ctx.prisma.tutorOffering
      .findUnique({
        where: { id: tutorOffering.id },
      })
      .schoolSubject();
  }

  @Authorized('STUDENT', 'ADMIN')
  @Mutation((returns) => TutorOffering)
  async tutorOffering(
    @Ctx() ctx: Context,
    @Arg('tutorOfferingInput') tutorOfferingInput: TutorOfferingInput
  ) {
    if (
      ctx.user?.role === 'STUDENT' &&
      tutorOfferingInput.studentId !== ctx.user?.student?.id
    ) {
      throw new Error(
        'You are not authorized to create or edit this tutor offering'
      );
    }

    let tutorOffering = await ctx.prisma.tutorOffering.findUnique({
      where: { id: tutorOfferingInput.id },
    });

    if (tutorOffering) {
      tutorOffering = await ctx.prisma.tutorOffering.update({
        where: { id: tutorOfferingInput.id },
        data: tutorOfferingInput,
      });
      if (!tutorOffering)
        throw new Error('Tutor offering could not be updated');
    } else {
      tutorOffering = await ctx.prisma.tutorOffering.create({
        data: {
          studentId: tutorOfferingInput.studentId,
          schoolClassId: tutorOfferingInput.schoolClassId,
          schoolSubjectId: tutorOfferingInput.schoolSubjectId,
          teacher: tutorOfferingInput.teacher,
          description: tutorOfferingInput.description,
        },
      });
      if (!tutorOffering)
        throw new Error('Tutor offering could not be created');
    }

    return tutorOffering;
  }
}
