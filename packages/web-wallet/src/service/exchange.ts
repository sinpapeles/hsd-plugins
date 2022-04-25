export const getExchangeRate = (currency: string = 'USD'): Promise<number> =>
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=handshake&vs_currencies=${currency}`
  )
    .then((r) => r.json())
    .then((r) => r.handshake[currency.toLowerCase()]);
