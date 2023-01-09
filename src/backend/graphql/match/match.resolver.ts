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
    const matchingOfferings: TutorOffering[] = [];
    for (const request of requests) {
      const offerings = await ctx.prisma.tutorOffering.findMany({
        where: {
          schoolSubjectId: request.schoolSubjectId,
        },
      });
      matchingOfferings.concat(offerings);
    }

    return matchingOfferings;
  }
}
