import { PrismaClient, User } from '@prisma/client';
import prisma from '../utils/prismadb';

export interface Context {
  prisma: PrismaClient;
  user: User | null;
}

export const context = async ({ req }) => {
  let user: User | null = null;

  if (req.session) {
    user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    });
  }

  const context: Context = {
    prisma: prisma,
    user: user,
  };
  return context;
};
