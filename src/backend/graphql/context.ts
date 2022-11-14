import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
}

export const context = ({ req }) => {
  const context: Context = {
    prisma: prisma,
    userId: req.session.userId,
  };
  return context;
};
