import axios from "axios";
import { selector, selectorFamily } from "recoil";

import { AMM } from "../../libs/ammsdk";
import { AddressState } from "../ethereum/atoms";

import { AMMUpdateFlagState } from "./atoms";
import { GameData, PairData, RelationMap } from "./types";

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

export const RelationSelectors = selectorFamily<
  { data: RelationMap } | null,
  string
>({
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

export const BalancesSelector = selectorFamily<number | null, string>({
  key: "BalancesSelector",
  get:
    (gameAddress) =>
    async ({ get }) => {
      if (!AMM) return [];
      get(AMMUpdateFlagState);
      const game = get(GamesSelector).find(
        (game) => game.data.signer === gameAddress
      );
      if (!game) return null;

      const relationMap = get(RelationSelectors(gameAddress));

      if (!relationMap) return null;

      const balance = await axios.get(
        `${game.data.endpoint}balanceOf?userId=${relationMap.data.game_user_id}`
      );
      console.log(balance.data);

      return balance.data.value;
    },
});
