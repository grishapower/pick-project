"use client";

import cn from "classnames";
import { PropsWithChildren } from "react";
import { fontSuisseIntl } from "~/fonts/index";

type Props = {
  className?: string;
  onClick?: () => void;
};

export const Heading = ({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <div className={cn(className, fontSuisseIntl.className)} {...props}>
      {children}
    </div>
  );
};
