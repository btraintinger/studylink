import { AuthChecker } from 'type-graphql';
import { Context } from './context';

export const customAuthChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  if (context.userId === null) return false;

  const user = await context.prisma.user.findUnique({
    where: { id: context.userId },
  });

  if (!user) return false;

  for (const role of roles) {
    if (user.role === role) return true;
  }

  return false;
};
