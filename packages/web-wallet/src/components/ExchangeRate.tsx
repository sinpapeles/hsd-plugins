import { usePreferences } from 'hooks/usePreferences';
import { useQuery } from 'react-query';
import { getExchangeRate } from 'service/exchange';
import Money from './Money';

interface Props {
  amount: number;
}
const ExchangeRate = ({ amount }: Props) => {
  const [pref] = usePreferences();

  const { data: rate, isLoading } = useQuery(
    ['exchangeRate', pref.currency],
    () => getExchangeRate(pref.currency)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!rate) {
    return null;
  }

  return <Money value={amount * rate} />;
};

export default ExchangeRate;
