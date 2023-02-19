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
    const student = await ctx.prisma.student.findUnique({
      where: {
        id: ctx.user?.student?.id,
      },
      include: {
        tutorRequests: true,
        tutorOfferings: true,
      },
    });
    const requests = student?.tutorRequests ?? [];
    const offerings = student?.tutorOfferings ?? [];

    const matches: {
      rating: number;
      tutorOffering: TutorOffering;
      tutorRequest: TutorRequest;
    }[] = [];

    for (const request of requests) {
      const matchingOfferings = await ctx.prisma.tutorOffering.findMany({
        where: {
          AND: [
            {
              schoolSubjectId: request.schoolSubjectId,
            },
            {
              grade: {
                gte: request.grade,
              },
            },
          ],
        },
      });

      for (const offering of matchingOfferings) {
        matches.push({
          tutorRequest: request,
          tutorOffering: offering,
          rating: matchRating(request, offering),
        });
      }
    }

    for (const offering of offerings) {
      const matchingRequests = await ctx.prisma.tutorRequest.findMany({
        where: {
          AND: [
            {
              schoolSubjectId: offering.schoolSubjectId,
            },
            {
              grade: {
                lte: offering.grade,
              },
            },
          ],
        },
      });

      for (const request of matchingRequests) {
        matches.push({
          tutorRequest: request,
          tutorOffering: offering,
          rating: matchRating(request, offering),
        });
      }
    }

    console.log(matches);

    return matches;
  }
}
