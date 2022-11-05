import clsx from "clsx";
import { forwardRef } from "react";

export type ThemeBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  transparent?: boolean;
};

//eslint-disable-next-line react/display-name
export const ThemeBox = forwardRef<HTMLDivElement, ThemeBoxProps>(
  ({ className, transparent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          transparent && "bg-transparent",

          className
        )}
        {...props}
        data-theme="lofi"
      />
    );
  }
);
