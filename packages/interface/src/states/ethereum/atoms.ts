import { ethers } from "ethers";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const ProviderState = atom<ethers.providers.Web3Provider | null>({
  key: "ProviderState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const AddressState = atom<string | null>({
  key: "AddressState",
  default: null,
  effects: [persistAtom],
});
