import { AuthChecker } from 'type-graphql';
import { Context } from './context';

export const customAuthChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  if (context.user === null) return false;

  for (const role of roles) {
    if (context.user.role === role) return true;
  }

  return false;
};
