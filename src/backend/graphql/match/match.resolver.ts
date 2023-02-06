/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TutorOffering, TutorRequest } from '@prisma/client';
import { Ctx, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import { Match } from './match.type';

function matchRating(request: TutorRequest, offering: TutorOffering): number {
  let rating = 0;
  if (request.grade === offering.grade) rating += 2;
  if (request.teacherId === offering.teacherId) rating += 1;
  return rating;
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
    const matches: {
      rating: number;
      tutorOffering: TutorOffering;
      tutorRequest: TutorRequest;
    }[] = [];

    requests.forEach(async (request) => {
      const matchingOfferings = await ctx.prisma.tutorOffering.findMany({
        where: {
          schoolSubjectId: request.schoolSubjectId,
          grade: {
            gte: request.grade,
          },
        },
      });
      matchingOfferings.forEach((offering) => {
        matches.push({
          tutorRequest: request,
          tutorOffering: offering,
          rating: matchRating(request, offering),
        });
      });
    });

    return matches;
  }
}
