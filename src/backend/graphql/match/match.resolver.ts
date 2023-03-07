/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TutorOffering, TutorRequest } from '@prisma/client';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { getMatchesOfStudent } from '../../utils/getMatches';
import type { Context } from '../context';
import { Match } from './match.type';
@Resolver((of) => Match)
export class MatchResolver {
  @Authorized('STUDENT')
  @Query((returns) => [Match])
  async getMatchesOfCurrentUser(@Ctx() ctx: Context) {
    if (!ctx?.user?.student) throw new Error('NoStudentError');

    return getMatchesOfStudent(ctx.user.student.id);
  }
}
