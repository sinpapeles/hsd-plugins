import { RouteComponentProps } from '@reach/router';
import ExchangeRate from 'components/ExchangeRate';
import { HNS } from 'components/Money';
import { useWallet } from 'graphql/wallet';

interface Props extends RouteComponentProps {
  id: string;
}
export default ({ id }: Props) => {
  const { data, isLoading, error } = useWallet({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data?.wallet) {
    return <div>No data</div>;
  }

  const { wallet } = data;

  return (
    <div className="p-4 mx-2 text-gray-800 bg-white border border-gray-400 rounded dark:bg-gray-900">
      <header className="mb-3 text-xl">Wallet: {wallet.id}</header>
      <div className="flex justify-between space-x-2">
        <div className="flex flex-col flex-1 space-y-2 divide-y">
          <div>
            <span className="block text-sm">Balance:</span>
            <HNS value={wallet.balance} />{' '}
            <small>
              (<ExchangeRate amount={wallet.balance} />)
            </small>
          </div>
          <div>
            <span className="block text-sm">Watch Only:</span>
            {wallet.watchOnly ? 'Yes' : 'No'}
          </div>
          <div>
            <span className="block text-sm">Encrypted:</span>
            {wallet.encrypted ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="flex flex-col flex-1 space-y-2 divide-y">
          {wallet.accounts.map((acc) => (
            <div key={acc.accountIndex}>
              <span className="block text-sm">Account:</span>
              {acc.name}{' '}
              <small>
                (<ExchangeRate amount={acc.balance} />)
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
