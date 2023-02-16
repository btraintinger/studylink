import {
  User,
  UserUpdateInput,
  ResetPasswordInput,
  ForgotPasswordInput,
  VerifyEmailInput,
} from './user.type';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendPasswordResetEmail } from '../../auth/sendPasswordResetEmail';

@Resolver((of) => User)
export class UserResolver {
  @Authorized('ADMIN', 'STUDENT')
  @Query((returns) => User)
  async getCurrentUser(@Ctx() ctx: Context) {
    if (!ctx.user) throw new Error('NotAuthorizedError');

    return await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
    });
  }

  @Authorized('ADMIN')
  @Mutation((returns) => User)
  async updateUser(
    @Ctx() ctx: Context,
    @Arg('userUpdateInput') userUpdateInput: UserUpdateInput
  ) {
    if (!ctx.user) throw new Error('NotAuthorizedError');

    return await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        name: userUpdateInput.name,
        email: userUpdateInput.email,
      },
    });
  }

  @Mutation((returns) => Boolean)
  async forgotPassword(
    @Ctx() ctx: Context,
    @Arg('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: { email: forgotPasswordInput.email },
    });
    if (!user) throw new Error('DoesNotExistError');

    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error('JWT_SECRET not set');

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '15min',
    });

    await ctx.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
      },
    });

    sendPasswordResetEmail(token, user.email);

    return true;
  }

  @Mutation((returns) => Boolean)
  async resetPassword(
    @Ctx() ctx: Context,
    @Arg('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  ) {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error('JWT_SECRET not set');

    let userId: string;
    try {
      const { id } = jwt.verify(resetPasswordInput.token, secret) as {
        id: string;
      };
      userId = id;
    } catch (e) {
      throw new Error('InvalidTokenError');
    }

    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
      select: { passwordResetToken: true },
    });

    if (!user) throw new Error('InvalidTokenError');

    if (user.passwordResetToken !== resetPasswordInput.token)
      throw new Error('InvalidTokenError');

    const passwordHash = await bcrypt.hash(resetPasswordInput.password, 10);

    await ctx.prisma.user.update({
      where: { id: userId },
      data: {
        password: passwordHash,
        passwordResetToken: null,
      },
    });

    return true;
  }

  @Mutation((returns) => Boolean)
  async verifyEmail(
    @Ctx() ctx: Context,
    @Arg('verifyEmailInput') verifyEmailInput: VerifyEmailInput
  ) {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error('JWT_SECRET not set');

    let userId: string;
    try {
      const { id } = jwt.verify(verifyEmailInput.token, secret) as {
        id: string;
      };
      userId = id;
    } catch (e) {
      throw new Error('InvalidTokenError');
    }

    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error('InvalidTokenError');
    if (user.emailVerificationToken !== verifyEmailInput.token)
      throw new Error('InvalidTokenError');

    if (user.emailVerified) throw new Error('EmailAlreadyVerifiedError');

    await ctx.prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });

    return true;
  }
}
