import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { StudylinkResolver } from './resolvers/resolvers';
import { customAuthChecker } from './authChecker';

export default async function createSchema() {
  const schema = await buildSchema({
    resolvers: [StudylinkResolver],
    authChecker: customAuthChecker,
  });
  return schema;
}
