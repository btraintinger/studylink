import { Match } from './match.type';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Ctx, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';

async function matchRating(
  teacher1: string,
  teacher2: string
): Promise<number> {
  if (teacher1 === teacher2) return 2;

  return 1;
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
        if (request.grade <= offering.grade) {
          matches.push({
            tutorRequest: request,
            tutorOffering: offering,
            rating: matchRating(request.teacher, offering.teacher),
          });
        }
      });
    }
    return matches;
  }
}
