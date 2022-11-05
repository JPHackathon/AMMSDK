import { useRecoilState } from "recoil";

import { ThemeState } from "./atoms";

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(ThemeState);
  return { theme, setTheme };
};
