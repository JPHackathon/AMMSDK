import WeaveDB, { ArWallet, ArweaveConfig, EthWallet } from "weavedb-sdk";
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
export declare class AMMSDK {
    readonly contractTxId: string;
    readonly weaveDB: WeaveDB;
    constructor({ contractTxId, wallet, arweave, }: AMMOptions);
    getGameData(address: string): Promise<any>;
    relateUser(data: UserMapData, wallet: EthWallet): Promise<void>;
    getUserMapData(gameAddress: string, userAddress: string): Promise<any>;
    getPair(_game1: string, _game2: string): Promise<any>;
    static getOutputAmount(inputAmount: number, inputReserve: number, outputReserve: number): number;
    swap(from: string, to: string, amountIn: number, wallet: EthWallet): Promise<void>;
}
