/// <reference types="vite/client" />
declare module 'animated-number-react' {
  import { FC } from 'react';

  const AnimatedNumber: FC<{
    value: number;
    formatValue?: (value: number) => string;
  }>;

  export default AnimatedNumber;
}
