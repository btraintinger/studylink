import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import ExampleResolver from './resolvers/example';

export default async function createSchema() {
  const schema = await buildSchema({ resolvers: [ExampleResolver] });
  return schema;
}
