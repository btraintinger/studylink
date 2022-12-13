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

@Resolver((of) => Match)
export class MatchResolver {
  @Query((returns) => [Match])
  async getMatchesOfCurrentUser(@Ctx() ctx: Context) {
    return null;
  }
}
