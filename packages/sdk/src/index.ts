import WeaveDB, { ArWallet, ArweaveConfig, EthWallet } from "weavedb-sdk";
import DemoWallet from "./assets/wallet.json";

export interface AMMOptions {
  contractTxId?: string;
  wallet?: ArWallet;
  arweave?: ArweaveConfig;
  ethWallet: EthWallet;
}

export interface GameData {
  signer: string;
  name: string;
  description: string;
  symbol: string;
  endpoint: string;
}

export interface UserMapData {
  game_address: string;
  user_address: string;
  game_user_id: string;
}

export class AMMSDK {
  readonly contractTxId: string;
  readonly weaveDB: WeaveDB;

  private ethWallet: EthWallet;

  constructor({
    contractTxId = "xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM",
    wallet = DemoWallet,
    arweave,
    ethWallet,
  }: AMMOptions) {
    this.contractTxId = contractTxId;
    this.ethWallet = ethWallet;
    this.weaveDB = new WeaveDB({
      wallet,
      contractTxId,
      name: "weavedb",
      EthWallet: ethWallet,
      version: "1",
      arweave: arweave || {
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 200000,
      },
    });
  }

  async getGameData(address: string) {
    return this.weaveDB.cget("games", address);
  }

  async setGameData(data: GameData) {
    await this.weaveDB.set(data, "games", data.signer);
  }

  async relateUser(data: UserMapData) {
    if (this.ethWallet.wallet !== data.game_address)
      throw new Error("Invalid game address");
    await this.weaveDB.add(data, "user_mappings");
  }

  async getRate(pair: string) {
    const pairData = await this.weaveDB.cget("pairs", pair);
    return pairData.amount0 / pairData.amount1;
  }

  async swap(game: string, amountIn: number) {}
}
