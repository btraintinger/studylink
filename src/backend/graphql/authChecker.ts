import { AuthChecker } from 'type-graphql';
import { Context } from './context';

export const customAuthChecker: AuthChecker<Context> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { context },
  roles
) => {
  if (context.user === null) return false;

  for (const role of roles) {
    if (context.user.role === role) return true;
  }

  return false;
};
