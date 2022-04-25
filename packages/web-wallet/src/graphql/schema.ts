export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  accountIndex: Scalars['Float'];
  accountKey: Scalars['String'];
  balance: Scalars['Float'];
  changeAddress: Scalars['String'];
  changeDepth: Scalars['Float'];
  /** Wallet's ID (name) */
  id: Scalars['String'];
  name: Scalars['ID'];
  receiveAddress: Scalars['String'];
  receiveDepth: Scalars['Float'];
  type: Scalars['String'];
  /** Wallet's ID (number) */
  wid: Scalars['Float'];
};

export type NodeInfo = {
  __typename?: 'NodeInfo';
  network: Scalars['String'];
  version: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  info: NodeInfo;
  wallet: Wallet;
  wallets: Array<Wallet>;
};


export type QueryAccountArgs = {
  accountID: Scalars['String'];
  walletID: Scalars['String'];
};


export type QueryWalletArgs = {
  id: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  accounts: Array<Account>;
  balance: Scalars['Float'];
  encrypted: Scalars['Boolean'];
  id: Scalars['ID'];
  watchOnly: Scalars['Boolean'];
};
