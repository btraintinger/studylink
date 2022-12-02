import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { QueryResolver } from './resolvers/queryResolver';
import { customAuthChecker } from './authChecker';
import { MutationResolver } from './resolvers/mutationResolver';

export default async function createSchema() {
  const schema = await buildSchema({
    resolvers: [QueryResolver, MutationResolver],
    authChecker: customAuthChecker,
  });
  return schema;
}
