import axios from "axios";
import WeaveDB, { ArWallet, ArweaveConfig, EthWallet } from "weavedb-sdk";

import DemoWallet from "./assets/wallet.json";

export interface AMMOptions {
  contractTxId?: string;
  wallet?: ArWallet;
  arweave?: ArweaveConfig;
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

  constructor({
    contractTxId = "xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM",
    wallet = DemoWallet,
    arweave,
  }: AMMOptions) {
    this.contractTxId = contractTxId;

    this.weaveDB = new WeaveDB({
      wallet,
      contractTxId,
      name: "weavedb",

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

  async getGames() {
    const games = await this.weaveDB.cget("games");
    return games;
  }

  async relateUser(data: UserMapData, wallet: EthWallet) {
    await this.weaveDB.set(
      data,
      "user_mappings",
      `${data.game_address}:${data.user_address}`,
      wallet
    );
  }

  async getUserMapData(gameAddress: string, userAddress: string) {
    const userMapData = await this.weaveDB.cget(
      "user_mappings",
      `${gameAddress}:${userAddress}`
    );
    return userMapData;
  }

  async getPair(_game1: string, _game2: string) {
    const [game1, game2] = [_game1, _game2].sort();
    const pairData = await this.weaveDB.cget("pairs", `${game1}:${game2}`);
    return pairData;
  }

  async getPairs() {
    const pairs = await this.weaveDB.cget("pairs");
    return pairs;
  }

  static getOutputAmount(
    inputAmount: number,
    inputReserve: number,
    outputReserve: number
  ) {
    const inputAmountWithFee = inputAmount * 997;
    const numerator = inputAmountWithFee * outputReserve;
    const denominator = inputReserve * 1000 + inputAmountWithFee;
    return numerator / denominator;
  }

  async swap(from: string, to: string, amountIn: number, wallet: EthWallet) {
    if (!wallet.wallet) return;

    const { data: pairData } = await this.getPair(from, to);
    const { address0, address1, amount0, amount1 } = pairData;

    if (Number(amount0) === 0 || Number(amount1) === 0)
      throw new Error("Pair reserves are empty");

    const amountOut = await AMMSDK.getOutputAmount(
      amountIn,
      from === address0 ? amount0 : amount1,
      from === address1 ? amount1 : amount0
    );

    const [
      { data: fromGameData },
      { data: toGameData },
      { data: fromUserData },
      { data: toUserData },
    ] = await Promise.all([
      this.getGameData(from),
      this.getGameData(to),
      this.getUserMapData(from, wallet.wallet),
      this.getUserMapData(to, wallet.wallet),
    ]);

    if (!fromUserData.game_user_id)
      throw new Error(`User not found in ${from}`);
    if (!toUserData.game_user_id) throw new Error(`User not found in ${to}`);

    await Promise.all([
      axios.post(`${fromGameData.endpoint}burn`, {
        amount: amountIn,
      }),
      axios.post(`${toGameData.endpoint}mint`, {
        amount: amountIn,
      }),
    ]);

    await this.weaveDB.update(
      {
        amount0: from === address0 ? amount0 + amountIn : amount0 - amountOut,
        amount1: from === address1 ? amount1 + amountIn : amount1 - amountOut,
      },
      "pairs",
      `${address0}:${address1}`,
      wallet
    );
  }
}
