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
export type LoginVariables = Types.Exact<{ [key: string]: never; }>;


export type Login = { __typename?: 'Query', info: { __typename?: 'NodeInfo', version: string, network: string } };


export const LoginDocument = `
    query Login {
  info {
    version
    network
  }
}
    `;
export const useLogin = <
      TData = Login,
      TError = unknown
    >(
      variables?: LoginVariables,
      options?: UseQueryOptions<Login, TError, TData>
    ) =>
    useQuery<Login, TError, TData>(
      variables === undefined ? ['Login'] : ['Login', variables],
      fetcher<Login, LoginVariables>(LoginDocument, variables),
      options
    );