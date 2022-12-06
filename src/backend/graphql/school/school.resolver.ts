/* eslint-disable @typescript-eslint/no-unused-vars */

import { MapsUgc } from '@mui/icons-material';
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
  @FieldResolver()
  async admins(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .admins();
  }

  @FieldResolver()
  async departments(@Root() school: School, @Ctx() ctx: Context) {
    return await ctx.prisma.school
      .findUnique({
        where: { id: school.id },
      })
      .departments();
  }

  @Authorized('ADMIN')
  @Query((returns) => School)
  async getSchoolById(@Arg('id') id: number, @Ctx() ctx: Context) {
    if (!ctx.user) throw new Error('Not logged in');

    if (ctx.user.admin?.schoolId !== id) throw new Error('Not authorized');

    return await ctx.prisma.school.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => School)
  async school(@Arg('school') schoolInput: SchoolInput, @Ctx() ctx: Context) {
    if (!ctx.user) throw new Error('Not logged in');

    if (ctx.user.admin?.schoolId !== schoolInput.id)
      throw new Error('Not authorized');

    let school = await ctx.prisma.school.findUnique({
      where: {
        id: schoolInput.id,
      },
    });

    if (school) {
      school = await ctx.prisma.school.update({
        where: {
          id: schoolInput.id,
        },
        data: {
          name: schoolInput.name,
          domain: schoolInput.domain,
        },
      });
    } else {
      school = await ctx.prisma.school.create({
        data: {
          id: schoolInput.id,
          name: schoolInput.name,
          handle: schoolInput.handle,
          domain: schoolInput.domain,
          admins: {
            connect: {
              id: ctx.user.admin?.id,
            },
          },
        },
      });
    }

    if (!school) throw new Error('School creation / update failed');
    return school;
  }
}
