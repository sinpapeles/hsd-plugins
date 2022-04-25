import 'reflect-metadata';
import * as http from 'http';
import createServer from './server';
import { FullNode, Logger } from './types';

export default class Plugin {
  server: Promise<http.Server>;
  port: number;
  logger: Logger;

  constructor(node: FullNode) {
    const { config } = node;
    this.logger = node.logger.context('GraphQL');
    this.port = config.uint('graphql-port') || 4000;

    const key = config.str('graphql-key') || config.str('api-key');

    if (!key) {
      throw new Error(
        'No API key provided. --graphql-key or --api-key must be provided.'
      );
    }

    if (!node.has('walletdb')) {
      throw new Error('GraphQL requires wallet.');
    }
    const options = { key, node };

    this.server = createServer(options);
  }

  async open() {
    return (await this.server).listen(this.port, () => {
      this.logger.info(`🍉 GraphQL Server is running`);
    });
  }
  async close() {
    return (await this.server).close();
  }

  static init(node: any) {
    return new Plugin(node);
  }
}
