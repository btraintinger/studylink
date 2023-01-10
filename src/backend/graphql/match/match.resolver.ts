import { Match } from './match.type';
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import type { Context } from '../context';
import { TutorOffering } from '@prisma/client';

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
      const machtingOfferings = await ctx.prisma.tutorOffering.findMany({
        where: {
          schoolSubjectId: request.schoolSubjectId,
        },
      });
      machtingOfferings.forEach((offering) => {
        matches.push({
          tutorRequest: request,
          tutorOffering: offering,
          rating: 0,
        });
      });
    }
    return matches;
  }
}
