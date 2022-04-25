// @ts-ignore
import FullNode from 'hsd/lib/node/fullnode';
// @ts-ignore
import Wallet from 'hsd/lib/wallet/plugin';
import Plugin from './plugin';

const node = new FullNode({
  config: true,
  network: 'main',
  memory: false,
  apiKey: '123123123',
  prefix: '/Users/fernando.falci/Library/Application Support/Bob/hsd_data',
  indexTx: true,
  indexAddress: true,
});
node.use(Wallet);

await node.open();

Plugin.init(node).open();
