import { ethers } from "ethers";
import { atom } from "recoil";

export const ProviderState = atom<ethers.providers.Web3Provider | null>({
  key: "ProviderState",
  default: null,
});

export const AddressState = atom<string | null>({
  key: "AddressState",
  default: null,
});
