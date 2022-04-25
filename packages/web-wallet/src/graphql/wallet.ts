import * as Types from './schema';

import { endpointUrl, fetchParams } from '../config';
import { useQuery, UseQueryOptions } from 'react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
    method: "POST",
    ...(fetchParams),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type WalletsVariables = Types.Exact<{ [key: string]: never; }>;


export type Wallets = { __typename?: 'Query', wallets: Array<{ __typename?: 'Wallet', id: string, balance: number, watchOnly: boolean, encrypted: boolean }> };

export type WalletVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type Wallet = { __typename?: 'Query', wallet: { __typename?: 'Wallet', id: string, balance: number, watchOnly: boolean, encrypted: boolean, accounts: Array<{ __typename?: 'Account', accountIndex: number, name: string, balance: number }> } };


export const WalletsDocument = `
    query Wallets {
  wallets {
    id
    balance
    watchOnly
    encrypted
  }
}
    `;
export const useWallets = <
      TData = Wallets,
      TError = unknown
    >(
      variables?: WalletsVariables,
      options?: UseQueryOptions<Wallets, TError, TData>
    ) =>
    useQuery<Wallets, TError, TData>(
      variables === undefined ? ['Wallets'] : ['Wallets', variables],
      fetcher<Wallets, WalletsVariables>(WalletsDocument, variables),
      options
    );
export const WalletDocument = `
    query Wallet($id: String!) {
  wallet(id: $id) {
    id
    balance
    watchOnly
    encrypted
    accounts {
      accountIndex
      name
      balance
    }
  }
}
    `;
export const useWallet = <
      TData = Wallet,
      TError = unknown
    >(
      variables: WalletVariables,
      options?: UseQueryOptions<Wallet, TError, TData>
    ) =>
    useQuery<Wallet, TError, TData>(
      ['Wallet', variables],
      fetcher<Wallet, WalletVariables>(WalletDocument, variables),
      options
    );