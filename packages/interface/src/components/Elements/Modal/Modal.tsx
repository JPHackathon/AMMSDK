import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, memo } from "react";

import { ThemeBox } from "../ThemeBox";

export type ModalProps = JSX.IntrinsicElements["div"] & {
  open: boolean;
  position?: "middle" | "bottom" | "auto";
  onClose: () => void;
};

export const ModalTitle = Dialog.Title;

//eslint-disable-next-line
export const Modal: React.FC<ModalProps> = memo(
  ({ children, className, open, onClose }) => {
    return (
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => onClose()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <ThemeBox
            transparent
            className="fixed inset-0 flex items-end justify-center p-4 sm:items-center"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full max-w-lg overflow-auto rounded-2xl bg-base-100 shadow-xl",
                  className
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </ThemeBox>
        </Dialog>
      </Transition>
    );
  }
);
