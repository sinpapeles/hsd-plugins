import { useToggle } from 'react-use';
import cn from 'classnames';
import {
  EyeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/outline';
import { Link } from '@reach/router';
import { Wallet } from '../../types';
import { HNS } from 'components/Money';
import ExchangeRate from 'components/ExchangeRate';

interface Props {
  item: Wallet;
}
export default ({ item }: Props) => {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <div className="text-gray-800 bg-white rounded-lg dark:bg-gray-700 dark:text-white">
      <div className="flex justify-between p-4" onClick={toggleExpanded}>
        <div>
          <div className="text-lg font-extrabold ">{item.id}</div>
          <div className="flex space-x-1">
            {item.watchOnly && (
              <div title="Watch only">
                <EyeIcon className="w-4 h-4" />
              </div>
            )}
            {item.encrypted ? (
              <ShieldCheckIcon className="w-4 h-4 text-green-600 dark:text-green-300" />
            ) : (
              <ShieldExclamationIcon className="w-4 h-4 text-orange-600 dark:text-red-400" />
            )}
          </div>
        </div>
        <div className="text-right">
          <div>
            <HNS value={item.balance} />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            <ExchangeRate amount={item.balance} />
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex text-white overflow-hidden max-h-0 duration-300 transition-all text-center',
          {
            'max-h-12': expanded,
          }
        )}
      >
        <Link
          to={`/wallets/${item.id}/tx`}
          className="flex-1 p-3 !text-white bg-green-500 hover:bg-green-400 rounded-bl-lg"
        >
          Transctions
        </Link>
        <Link
          to={`/wallets/${item.id}`}
          className="flex-1 p-3 !text-white rounded-br-lg bg-violet-600 hover:bg-violet-500"
        >
          Config
        </Link>
      </div>
    </div>
  );
};
