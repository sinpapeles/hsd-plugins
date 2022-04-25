import React, { FC } from 'react';
import CurrencyFormat from 'react-currency-format';

interface MoneyProps {
  value: number;
  className?: string;
}

const Money: FC<MoneyProps> = (props) => (
  <CurrencyFormat
    displayType={'text'}
    thousandSeparator={true}
    prefix={'$'}
    decimalScale={2}
    fixedDecimalScale
    {...props}
  />
);

export const HNS: FC<MoneyProps & { dollarydoos?: boolean }> = ({
  value,
  dollarydoos,
  ...props
}) => (
  <span className="whitespace-nowrap">
    <CurrencyFormat
      displayType={'text'}
      thousandSeparator={true}
      suffix={' HNS'}
      decimalScale={6}
      value={dollarydoos ? value / 1e6 : value}
      {...props}
    />
  </span>
);

export default Money;
