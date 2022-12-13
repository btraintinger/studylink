import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import createSchema from '../../backend/graphql/schema';
import { context } from '../../backend/graphql/context';

const isProduction = process.env.NODE_ENV === 'production';
const apolloServer = new ApolloServer({
  schema: await createSchema(),
  introspection: !isProduction,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: context,
});
