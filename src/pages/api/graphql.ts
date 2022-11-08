import { gql, ApolloServer } from 'apollo-server-micro';
import { createSchema } from '../../..backend/graphql/schema';

const schema = await createSchema();

const apolloServer = new ApolloServer({ schema });

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
