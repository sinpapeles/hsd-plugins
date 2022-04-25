import { PluginParams } from '.';
import { NodeInfo } from '../resolver/types';

export type Logger = {
  context: (name: string) => Logger;
  info: (message: string) => void;
};

export type Balance = {
  account: number;
  tx: number;
  coin: number;
  unconfirmed: number;
  confirmed: number;
  ulocked: number;
  clocked: number;
};

export type HDPublicKey = {
  xpubkey: (network: string) => string;
};

export type Address = {
  toString: (network: string) => string;
};

export type Account = {
  id: string; // wallet
  wid: number; // wallet
  name: string;
  type: 'pubkeyhash' | 'multisig';
  m: number;
  n: number;
  accountIndex: number;
  receiveDepth: number;
  changeDepth: number;
  receiveAddress: () => Address;
  changeAddress: () => Address;
  accountKey: HDPublicKey;
};

export type Wallet = {
  id: string;
  watchOnly: boolean;
  master: {
    encrypted: boolean;
  };
  getBalance: (index?: number) => Promise<Balance>;
  getAccounts: () => string[];
  getAccount: (id: string) => Promise<Account>;
};

export type WalletDB = {
  getWallets: () => Promise<string[]>;
  get: (id: string) => Promise<Wallet>;
};

export type RPC = {
  getInfo: () => NodeInfo;
};

export type WalletPlugin = {
  wdb: WalletDB;
};

export type FullNode = {
  rpc: RPC;
  get: (name: string) => any;
  has: (name: string) => boolean;
  logger: Logger;
  config: {
    str: (key: keyof PluginParams) => string | undefined;
    uint: (key: keyof PluginParams) => number | undefined;
  };
};
