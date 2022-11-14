import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { customAuthChecker } from './authChecker';

export default async function createSchema() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: customAuthChecker,
  });
  return schema;
}
