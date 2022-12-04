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
}
