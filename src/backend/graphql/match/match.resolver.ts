/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getMatchesOfStudent } from './getMatches';
import type { Context } from '../context';
import { AcceptMatchInput, Match } from './match.type';
import { notifyMatchAccept } from '../../notifications/notifyMatchAcception';
@Resolver((of) => Match)
export class MatchResolver {
  @Authorized('STUDENT')
  @Query((returns) => [Match])
  async getMatchesOfCurrentUser(@Ctx() ctx: Context) {
    if (!ctx?.user?.student) throw new Error('NoStudentError');

    return getMatchesOfStudent(ctx.user.student.id);
  }

  @Authorized('STUDENT')
  @Mutation((returns) => Boolean)
  async acceptMatch(
    @Ctx() ctx: Context,
    @Arg('acceptMatchInput') acceptMatchInput: AcceptMatchInput
  ) {
    const tutorOffering = await ctx.prisma.tutorOffering.findUnique({
      where: { id: acceptMatchInput.tutorOfferingId },
      include: { schoolSubject: { include: { school: true } } },
    });
    const tutorRequest = await ctx.prisma.tutorRequest.findUnique({
      where: { id: acceptMatchInput.tutorRequestId },
      include: { schoolSubject: { include: { school: true } } },
    });
    if (!tutorOffering || !tutorRequest)
      throw new Error('NoTutorOfferingError');

    if (
      tutorOffering.schoolSubject.school.id !==
      tutorRequest.schoolSubject.school.id
    )
      throw new Error('SchoolMismatchError');

    notifyMatchAccept({
      tutorOfferingId: acceptMatchInput.tutorOfferingId,
      tutorRequestId: acceptMatchInput.tutorRequestId,
    });

    return true;
  }
}
