import clsx from "clsx";

import { HomeLayout } from "../components/Layout/HomeLayout";
import { useTheme } from "../states/common/operations";

const themeList = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function Theme() {
  const { theme: currentTheme, setTheme } = useTheme();
  return (
    <HomeLayout>
      <h1 className="text-2xl font-bold">Themes</h1>
      <div className="w-full flex justify-center mt-8 sm:mt-16">
        <div className="grid grid-cols-2 w-full max-w-lg gap-2">
          {themeList.map((theme) => (
            <div
              key={theme}
              className={clsx(
                "bg-base-100 text-base-content flex cursor-pointer rounded-lg p-2",
                currentTheme === theme && "ring-neutral ring-2"
              )}
              onClick={() => setTheme(theme)}
              data-theme={theme}
            >
              <div className="flex-1 py-1 text-sm font-bold">{theme}</div>
              <div className="flex gap-1">
                <div className="bg-info h-full w-2 rounded-lg" />
                <div className="bg-warning h-full w-2 rounded-lg" />
                <div className="bg-error h-full w-2 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
