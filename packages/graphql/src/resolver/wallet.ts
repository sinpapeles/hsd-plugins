import { Arg, Query, Resolver } from 'type-graphql';
import { WalletDB } from '../middleware/hsd';
import { WalletDB as WalletDBType } from '../types';
import { Account, Wallet } from './types';

@Resolver()
export class WalletsResolver {
  @Query(() => Account)
  async account(
    @WalletDB() wdb: WalletDBType,
    @Arg('walletID') id: string,
    @Arg('accountID') name: string
  ): Promise<Account> {
    const wallet = await wdb.get(id);
    const account = await wallet.getAccount(name);

    const { unconfirmed, clocked } = await wallet.getBalance(
      account.accountIndex
    );
    const balance = (unconfirmed - clocked) / 1e6;

    return {
      ...account,
      balance,
      receiveAddress: account.receiveAddress().toString('main'),
      changeAddress: account.changeAddress().toString('main'),
      accountKey: account.accountKey.xpubkey('main'),
    };
  }

  @Query(() => Wallet)
  async wallet(
    @WalletDB() wdb: WalletDBType,
    @Arg('id') id: string
  ): Promise<Wallet> {
    const wallet = await wdb.get(id);

    const { unconfirmed, clocked } = await wallet.getBalance();
    const balance = (unconfirmed - clocked) / 1e6;
    const accountsID = await wallet.getAccounts();

    // console.log({ balance, id });

    const accounts = await Promise.all(
      accountsID.map((a) => this.account(wdb, id, a))
    );

    return {
      id,
      balance,
      watchOnly: wallet.watchOnly,
      encrypted: wallet.master.encrypted,
      accounts,
    };
  }

  @Query(() => [Wallet])
  async wallets(@WalletDB() wdb: WalletDBType): Promise<Wallet[]> {
    const wallets = await wdb.getWallets();

    return Promise.all(wallets.map((id) => this.wallet(wdb, id)));
  }
}
