/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Context } from '../context';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../typeDefs/user';
import { Student } from '../typeDefs/student';

@Resolver()
export class QueryResolver {
  @Authorized('ADMIN', 'STUDENT')
  @Query((returns) => User)
  async getUser(@Ctx() ctx: Context) {
    return ctx.user;
  }

  @Authorized('STUDENT')
  @Query((returns) => Student)
  async getStudent(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    return await ctx.prisma.student.findUnique({
      where: { userId: ctx.user.id },
      include: {
        schoolClass: {
          include: { classHasSubject: { include: { schoolSubject: true } } },
        },
        tutorOffering: {
          include: {
            schoolClass: {
              include: {
                classHasSubject: { include: { schoolSubject: true } },
              },
            },
          },
        },
        tutorRequest: {
          include: {
            schoolClass: {
              include: {
                classHasSubject: { include: { schoolSubject: true } },
              },
            },
          },
        },
      },
    });
  }

  @Authorized('ADMIN')
  async getAdmin(@Ctx() ctx: Context) {
    if (!ctx.user) return null;

    return await ctx.prisma.admin.findUnique({
      where: { userId: ctx.user.id },
      include: {
        school: {
          include: {
            departments: {
              include: {
                schoolClasses: {
                  include: {
                    classHasSubject: { include: { schoolSubject: true } },
                  },
                },
              },
            },
            admins: true,
          },
        },
      },
    });
  }
}
