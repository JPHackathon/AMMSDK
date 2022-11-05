import axios from "axios";
import { selector, selectorFamily } from "recoil";

import { AMM } from "../../libs/ammsdk";
import { AddressState } from "../ethereum/atoms";

import { AMMUpdateFlagState } from "./atoms";
import { GameData, PairData } from "./types";

export const PairsSelector = selector({
  key: "PairsSelector",
  get: async ({ get }) => {
    if (!AMM) return [];
    get(AMMUpdateFlagState);
    const pairs = (await AMM.getPairs()) as { data: PairData }[];

    return pairs;
  },
});

export const GamesSelector = selector({
  key: "GamesSelector",
  get: async ({ get }) => {
    if (!AMM) return [];
    get(AMMUpdateFlagState);
    const games = (await AMM.getGames()) as { data: GameData }[];

    return games;
  },
});

export const RelationSelectors = selectorFamily<string, string>({
  key: "RelationSelectors",
  get:
    (gameAddress) =>
    async ({ get }) => {
      get(AMMUpdateFlagState);
      const address = get(AddressState);
      if (!AMM || !address) return null;

      const res = await AMM.getUserMapData(gameAddress, address);

      return res;
    },
});

export const BalancesSelector = selector({
  key: "BalancesSelector",
  get: async ({ get }) => {
    if (!AMM) return [];
    get(AMMUpdateFlagState);
    const games = get(GamesSelector);
    const balances = await Promise.all(
      games.map(async ({ data }) => {
        console.log(data);
        const res = await axios.get(
          `https://balance-lic6gc3kiq-uc.a.run.app?userId=ffEQY9lChRcV8inCMrlDowFreJ02`
        );
        console.log(res);
      })
    );

    return games;
  },
});
