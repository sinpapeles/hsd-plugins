import { Redirect, RouteComponentProps } from '@reach/router';
import { useWallets } from 'graphql/wallet';
import { Wallets } from 'components/wallets';

export default (_: RouteComponentProps) => {
  const { data, isLoading, error } = useWallets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <Wallets items={data?.wallets || []} />;
};
