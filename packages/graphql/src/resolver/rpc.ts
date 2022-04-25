import { Query, Resolver } from 'type-graphql';
import { RPC } from '../middleware/hsd';
import { RPC as RPCType } from '../types';
import { NodeInfo } from './types';

@Resolver()
export class RPCResolver {
  @Query(() => NodeInfo)
  async info(@RPC() rpc: RPCType): Promise<NodeInfo> {
    return rpc.getInfo();
  }
}
