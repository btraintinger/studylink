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
import { School, SchoolCreationInput, SchoolUpdateInput } from './school.type';

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
  async createSchool(
    @Arg('schoolCreationInput') schoolCreationInput: SchoolCreationInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user) throw new Error('Not logged in');

    const school = await ctx.prisma.school.create({
      data: {
        name: schoolCreationInput.name,
        handle: schoolCreationInput.handle,
        domain: schoolCreationInput.domain,
        admins: {
          connect: {
            id: ctx.user.admin?.id,
          },
        },
      },
    });

    if (!school) throw new Error('School creation failed');
    return school;
  }

  @Authorized('ADMIN')
  @Mutation((returns) => School)
  async updateSchool(
    @Arg('schoolUpdateInput') schoolUpdateInput: SchoolUpdateInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user) throw new Error('Not logged in');

    if (ctx.user.admin?.schoolId !== schoolUpdateInput.id)
      throw new Error('Not authorized');

    let school = await ctx.prisma.school.findUnique({
      where: {
        id: schoolUpdateInput.id,
      },
    });

    if (school) {
      school = await ctx.prisma.school.update({
        where: {
          id: schoolUpdateInput.id,
        },
        data: {
          name: schoolUpdateInput.name,
          handle: schoolUpdateInput.handle,
          domain: schoolUpdateInput.domain,
        },
      });
    } else {
      throw new Error('School does not exist');
    }

    if (!school) throw new Error('School update failed');
    return school;
  }
}
