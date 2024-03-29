"use client";

import { PropsWithChildren } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
};

export const Text = ({
  children,
  className,
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};
