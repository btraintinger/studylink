/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Mutation,
  Resolver,
  Root,
  Arg,
} from 'type-graphql';
import type { Context } from '../context';
import { School, SchoolInput } from './school.type';

@Resolver((of) => School)
export class SchoolResolver {
  @Mutation((returns) => School)
  async createSchool(
    @Ctx() ctx: Context,
    @Arg('schoolInput') SchoolInput: SchoolInput
  ) {
    return await ctx.prisma.school.create({
      data: {
        name: SchoolInput.name,
      },
    });
  }
}
