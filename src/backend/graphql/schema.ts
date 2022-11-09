import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';

export async function createSchema() {
  const schema = await buildSchema({ resolvers });
  return schema;
}
