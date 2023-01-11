import { Match } from './match.type';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Ctx, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';

async function matchRating(
  reqTeacher: string,
  offTeacher: string,
  reqGrade: number,
  offGrade: number
): Promise<number> {
  if (reqTeacher === offTeacher && reqGrade === offGrade) return 4;
  else if (reqGrade === offGrade) return 3;
  else if (reqTeacher === offTeacher && reqGrade <= offGrade) return 2;
  else if (reqGrade <= offGrade) return 1;
  return 0;
}

@Resolver((of) => Match)
export class MatchResolver {
  @Query((returns) => [Match])
  async getMatchesOfCurrentUser(@Ctx() ctx: Context) {
    const requests = await ctx.prisma.tutorRequest.findMany({
      where: {
        id: ctx.user?.student?.id,
      },
    });
    const matches: any[] = [];
    for (const request of requests) {
      const matchingOfferings = await ctx.prisma.tutorOffering.findMany({
        where: {
          schoolSubjectId: request.schoolSubjectId,
        },
      });
      matchingOfferings.forEach((offering) => {
        matches.push({
          tutorRequest: request,
          tutorOffering: offering,
          rating: matchRating(
            request.teacher,
            offering.teacher,
            request.grade,
            offering.grade
          ),
        });
      });
    }
    return matches;
  }
}
