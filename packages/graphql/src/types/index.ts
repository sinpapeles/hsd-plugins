import { PubSubEngine } from 'graphql-subscriptions';
import { FullNode } from './hsd';

export interface AppContext {
  pubsub: PubSubEngine;
  authorization?: string;
  key: string;
  node: FullNode;
}

export type PluginParams = {
  'api-key'?: string;
  'graphql-key'?: string;
  'graphql-port'?: number;
  'graphql-url'?: string;
};

export * from './hsd';
