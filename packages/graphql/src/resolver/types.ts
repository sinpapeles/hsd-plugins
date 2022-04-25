import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Account {
  @Field({ description: "Wallet's ID (name)" })
  id: string;

  @Field({ description: "Wallet's ID (number)" })
  wid: number; // wallet

  @Field(() => ID)
  name: string;

  @Field()
  type: 'pubkeyhash' | 'multisig';

  @Field()
  accountIndex: number;

  @Field()
  receiveDepth: number;

  @Field()
  changeDepth: number;

  @Field()
  receiveAddress: string;

  @Field()
  changeAddress: string;

  @Field()
  accountKey: string;

  @Field()
  balance: number;
}

@ObjectType()
export class Multisig extends Account {
  @Field()
  declare type: 'multisig';

  @Field()
  m: number;

  @Field()
  n: number;
}

@ObjectType()
export class Wallet {
  @Field(() => ID)
  id: string;

  @Field()
  balance: number;

  @Field()
  watchOnly: boolean;

  @Field()
  encrypted: boolean;

  @Field(() => [Account])
  accounts: Account[];
}

@ObjectType()
export class NodeInfo {
  @Field()
  version: string;

  @Field()
  network: string;
}
