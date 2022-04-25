import express from 'express';
import apolloServer from './apolloServer';
import corsMiddleware from './middleware/cors';
import 'reflect-metadata';
import { FullNode } from './types';

interface Options {
  cors?: string;
  key: string;
  node: FullNode;
}

export default async ({ cors, key, node }: Options) => {
  const app = express();

  if (cors) {
    app.use(corsMiddleware);
  }

  const context = { key, node };

  return await apolloServer(app, context);
};
