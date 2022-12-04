import { TutorRequest, TutorRequestInput } from './tutorRequest.type';
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

@Resolver((of) => TutorRequest)
export class TutorRequestResolver {
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
}
