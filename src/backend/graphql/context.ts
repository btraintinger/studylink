import { authOptions } from './../../pages/api/auth/[...nextauth]';
import { Admin, PrismaClient, Student, User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import prisma from '../utils/prismadb';

interface ContextUser extends User {
  admin: Admin | null;
  student: Student | null;
}

export interface Context {
  prisma: PrismaClient;
  user: ContextUser | null;
}

export const context = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: ContextUser | null = null;

  const session = await unstable_getServerSession(req, res, authOptions);
  const sessionUser = session?.user as User;

  if (session?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: sessionUser.id,
      },
      include: {
        student: true,
        admin: true,
      },
    });
  }

  const context: Context = {
    prisma,
    user,
  };
  return context;
};
