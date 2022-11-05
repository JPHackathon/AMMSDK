import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

import { TempWallet } from "./types";

export const TempWalletStates = atomFamily<TempWallet | null, string>({
  key: "TempWalletStates",
  default: null,
  effects: [persistAtom],
});
