/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getMatchesOfStudent } from './getMatches';
import type { Context } from '../context';
import {
  AcceptMatchInput,
  Match,
  MatchConnectionInfo,
  MatchConnectionInfoInput,
} from './match.type';
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
  @Query((returns) => MatchConnectionInfo)
  async getMatchConnectionInfo(
    @Ctx() ctx: Context,
    @Arg('matchConnectionInfoInput')
    matchConnectionInfoInput: MatchConnectionInfoInput
  ) {
    if (!ctx?.user?.student) throw new Error('NoStudentError');

    const ownStudent = await ctx.prisma.student.findUnique({
      where: { id: ctx.user.student.id },
      include: {
        schoolClass: {
          include: {
            department: true,
          },
        },
      },
    });

    const matchedStudent = await ctx.prisma.student.findUnique({
      where: { id: matchConnectionInfoInput.studentId },
      include: {
        schoolClass: {
          include: {
            department: true,
          },
        },
      },
    });

    if (!ownStudent || !matchedStudent) throw new Error('NoStudentError');

    if (
      ownStudent?.schoolClass?.department.schoolId !==
      matchedStudent?.schoolClass?.department.schoolId
    )
      throw new Error('NotAuthorizedError');

    return {
      student: matchedStudent,
      schoolClass: matchedStudent.schoolClass,
    };
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
