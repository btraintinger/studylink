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

  @Authorized('STUDENT', 'ADMIN')
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
