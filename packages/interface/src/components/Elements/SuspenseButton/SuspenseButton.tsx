import clsx from "clsx";
import { Suspense } from "react";

export const SuspenseButton: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <Suspense
      fallback={
        <button
          disabled
          className={clsx("loading btn-disabled", className)}
          {...props}
        >
          Loading
        </button>
      }
    >
      <button {...props} />
    </Suspense>
  );
};
