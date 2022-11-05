import {
  Bars3Icon,
  CalculatorIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";
import { useState } from "react";

import { useAMM } from "../../hooks/useAMM";
import { Drawer, NoSSR, ThemeBox } from "../Elements";

const SideBody = () => {
  const { address } = useAMM();
  return (
    <>
      <div className="border-b-2 flex p-2">
        <div className="card overflow-hidden h-12 w-12">
          <Avatar
            size="100%"
            name={address || "0x00"}
            variant="marble"
            square
          />
        </div>
      </div>
      <a className="btn btn-ghost justify-start p-2 gap-2">
        <CalculatorIcon className="w-6 h-6" />
        Swap
      </a>
      <a className="btn btn-ghost justify-start p-2 gap-2">
        <RectangleGroupIcon className="w-6 h-6" />
        Games
      </a>
    </>
  );
};

const SideDrawer = () => {
  return (
    <div className="sticky top-0 hidden h-screen w-full max-w-xs p-4 md:block">
      <div className="card h-full w-full bg-base-100 p-4 shadow-lg">
        <div className="flex flex-col gap-2">
          <NoSSR>
            <SideBody />
          </NoSSR>
        </div>
      </div>
    </div>
  );
};

export const MobilSideDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <SideBody />
    </Drawer>
  );
};

const MobileTopNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobilSideDrawer open={open} onClose={() => setOpen(false)} />
      <header className="fixed top-0 z-50 w-full p-2 md:hidden">
        <nav className="flex w-full bg-base-100 shadow-lg p-2 card">
          <button
            className="btn-ghost btn-square btn"
            onClick={() => setOpen(true)}
          >
            <Bars3Icon className="w-12" />
          </button>
        </nav>
      </header>
    </>
  );
};

export const HomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeBox className="min-h-screen bg-base-200">
      <MobileTopNav />
      <div className="mx-auto flex w-full max-w-screen-2xl pt-12 md:pt-0">
        <SideDrawer />
        <div className="w-full flex-1 px-4 pt-8">{children}</div>
      </div>
    </ThemeBox>
  );
};
