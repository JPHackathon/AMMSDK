import { atom } from "recoil";

export const ThemeState = atom<string>({
  key: "ThemeState",
  default: "light",
});
