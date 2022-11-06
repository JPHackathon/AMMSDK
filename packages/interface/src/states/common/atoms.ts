import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const ThemeState = atom<string>({
  key: "ThemeState",
  default: "lofi",
  effects: [persistAtom],
});
