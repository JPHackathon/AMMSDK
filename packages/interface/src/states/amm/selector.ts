import { selector } from "recoil";

import { AMM } from "../../libs/ammsdk";

import { AMMUpdateFlagState } from "./atoms";

export const PairsSelector = selector({
  key: "PairsSelector",
  get: async ({ get }) => {
    if (!AMM) return [];
    get(AMMUpdateFlagState);
    const pairs = (await AMM.getPairs()) as string[];

    return pairs;
  },
});

export const GamesSelector = selector({
  key: "GamesSelector",
  get: async ({ get }) => {
    if (!AMM) return [];
    get(AMMUpdateFlagState);
    const games = (await AMM.getGames()) as string[];

    return games;
  },
});
