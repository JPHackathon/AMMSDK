interface Window {
  ethereum: any | undefined;
}
declare var window: Window;

declare module "weavedb-sdk" {
  export interface ArweaveConfig {
    host?: string;
    protocol?: string;
    port?: string | number;
    timeout?: number;
    logging?: boolean;
    logger?: Function;
    network?: string;
  }

  export type SigningFunction = (tx: Transaction) => Promise<void>;

  export interface ArWallet {
    kty: string;
    e: string;
    n: string;
    d?: string;
    p?: string;
    q?: string;
    dp?: string;
    dq?: string;
    qi?: string;
  }

  export type WarpSigner = SigningFunction | ArweaveWallet | "use_wallet";

  export interface EthWallet {
    wallet: string;
    privateKey: string;
  }

  export interface WeaveDBConfig {
    arweave?: ArweaveConfig;
    contractTxId: string; // maybe
    wallet: WarpSigner;
    name: string;
    version: string;
    EthWallet?: string | EthWallet; //maybe
    web3?: any;
  }

  export type OP = {
    //I don't know what this is
    __op: string;
  } & any;

  export default class SDK {
    constructor(config: WeaveDBConfig);
    cget<T = any>(path: string, ...query: string[][]): Promise<T>;
    add<T = any>(data: T, path: string, user: EthWallet): Promise<void>;
    update<T = any>(
      data: T,
      path: string,
      id: string,
      user: EthWallet
    ): Promise<void>;
    delete(path: string, id: string, user: EthWallet): Promise<void>;
    ts(): OP;
    signer(): OP;
    createTempAddress(
      address: string
    ): Promise<{ tx: any; identity: any; err: any }>;
  }
}
