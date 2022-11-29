import { authOptions } from './../../pages/api/auth/[...nextauth]';
import { PrismaClient, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import prisma from '../utils/prismadb';

export interface Context {
  prisma: PrismaClient;
  user: User | null;
}

export const context = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: User | null = null;

  const session = await unstable_getServerSession(req, res, authOptions);
  const sessionUser = session?.user as User;

  if (session?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: sessionUser.id,
      },
    });
  }

  const context: Context = {
    prisma: prisma,
    user: user,
  };
  return context;
};
