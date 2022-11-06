import { useRecoilValue } from "recoil";

import {
  BalancesSelector,
  GamesSelector,
  PairsSelector,
  RelationSelectors,
} from "./selector";
import { GameData } from "./types";

export const useAMMData = () => {
  const pairs = useRecoilValue(PairsSelector);
  const games = useRecoilValue(GamesSelector);
  // const balances = useRecoilValue(BalancesSelector);
  return { pairs, games };
};

export const useRelations = (game: GameData | null) => {
  return useRecoilValue(RelationSelectors(game?.signer || ""));
};

export const useBalances = (game: GameData | null) => {
  return useRecoilValue(BalancesSelector(game?.signer || ""));
};
