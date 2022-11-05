import { selector } from "recoil";

import { AddressState } from "../ethereum/atoms";

import { TempWalletStates } from "./atom";
import { TempWallet } from "./types";

export const TempWalletSelector = selector<TempWallet | null>({
  key: "TempWalletSelector",
  get: ({ get }) => {
    const address = get(AddressState);
    if (!address) return null;

    const tempWallet = get(TempWalletStates(address));
    return tempWallet;
  },
});
