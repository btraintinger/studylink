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
  @Authorized('STUDENT', 'ADMIN')
  @Mutation((returns) => TutorRequest)
  async tutorRequest(
    @Ctx() ctx: Context,
    @Arg('tutorRequestInput') tutorRequestInput: TutorRequestInput
  ) {
    if (
      ctx.user?.role === 'STUDENT' &&
      tutorRequestInput.studentId !== ctx.user?.student?.id
    ) {
      throw new Error('Unauthorized');
    }

    let tutorRequest = await ctx.prisma.tutorRequest.findUnique({
      where: { id: tutorRequestInput.id },
    });

    if (tutorRequest) {
      tutorRequest = await ctx.prisma.tutorRequest.update({
        where: { id: tutorRequestInput.id },
        data: tutorRequestInput,
      });
      if (!tutorRequest) throw new Error('Tutor Request could not be updated');
    } else {
      tutorRequest = await ctx.prisma.tutorRequest.create({
        data: {
          studentId: tutorRequestInput.studentId,
          schoolClassId: tutorRequestInput.schoolClassId,
          schoolSubjectId: tutorRequestInput.schoolSubjectId,
          description: tutorRequestInput.description,
        },
      });
      if (!tutorRequest) throw new Error('Tutor Request could not be created');
    }

    return tutorRequest;
  }
}
