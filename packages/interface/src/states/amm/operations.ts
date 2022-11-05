import { useRecoilValue } from "recoil";

import { GamesSelector, PairsSelector } from "./selector";

export const useAMMData = () => {
  const pairs = useRecoilValue(PairsSelector);
  const games = useRecoilValue(GamesSelector);
  return { pairs, games };
};
