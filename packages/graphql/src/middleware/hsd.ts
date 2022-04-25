import { createParamDecorator } from 'type-graphql';
import {
  AppContext,
  RPC as RPCType,
  WalletDB as WDB,
  WalletPlugin,
} from '../types';

export function WalletDB() {
  return createParamDecorator<AppContext>(({ context: { node } }): WDB => {
    return (node.get('walletdb') as WalletPlugin).wdb;
  });
}
export function RPC() {
  return createParamDecorator<AppContext>(({ context: { node } }): RPCType => {
    return node.rpc;
  });
}
