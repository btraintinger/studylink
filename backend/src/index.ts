import { ApolloServer } from "apollo-server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { schema } from "./schema/schema";
export const server = new ApolloServer({
    context: () => ({ prisma }),
    schema,
});

const port = 3000;

server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});