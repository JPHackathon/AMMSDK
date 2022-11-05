import { atom } from "recoil";

export const AMMUpdateFlagState = atom<string>({
  key: "AMMUpdateFlagState",
  default: "0",
});
