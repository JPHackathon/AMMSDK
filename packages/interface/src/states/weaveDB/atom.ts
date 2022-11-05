import { atomFamily } from "recoil";

import { TempWallet } from "./types";

export const TempWalletStates = atomFamily<TempWallet | null, string>({
  key: "TempWalletStates",
  default: null,
});
