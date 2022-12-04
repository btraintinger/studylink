import { SchoolClass } from './schoolClass.type';
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
import { includes } from 'lodash';

@Resolver((of) => SchoolClass)
export class SchoolClassResolver {
  @FieldResolver()
  async schoolSubjects(@Root() schoolClass: SchoolClass, @Ctx() ctx: Context) {
    const classHasSubjects = await ctx.prisma.schoolClass
      .findUnique({
        where: { id: schoolClass.id },
      })
      .classHasSubject({ include: { schoolSubject: true } });

    if (!classHasSubjects) return null;

    return classHasSubjects.map(
      (classHasSubject) => classHasSubject.schoolSubject
    );
  }
}
