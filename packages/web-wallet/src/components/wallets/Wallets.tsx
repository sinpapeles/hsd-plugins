import { Wallet } from '../../types';
import WalletComponent from './Wallet';

interface Props {
  items: Wallet[];
}
export default ({ items }: Props) => {
  return (
    <div className="grid items-start gap-2 px-2 mb-14 grid-cols-wallet">
      {items?.map((wallet) => (
        <WalletComponent key={wallet.id} item={wallet} />
      ))}
    </div>
  );
};
