import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { pubsub } from './pubsub';
import { Request } from 'express';
import {
  emitSchemaDefinitionWithDirectivesFile,
  resolvers,
  typeDefs,
} from './resolver';
import { AppContext } from './types';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

if (process.env.GENERATE_SCHEMA !== undefined) {
  emitSchemaDefinitionWithDirectivesFile('schema.graphql', schema);
}

export default async (
  app: Application,
  ctx: Pick<AppContext, 'key' | 'node'>
) => {
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const wsContext = (): Omit<AppContext, 'authorization'> => ({
    pubsub,
    ...ctx,
  });

  const context = ({ req }: { req: Request }): AppContext => {
    return {
      authorization: req.get('authorization'),
      ...wsContext(),
    };
  };

  const serverCleanup = useServer({ schema, context: wsContext }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    context,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return httpServer;
};
