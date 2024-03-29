import cn from "classnames";
import { PropsWithChildren } from "react";

export const PlayoffColumn = ({ children }: PropsWithChildren) => {
  return <div className={cn("playoff-column")}>{children}</div>;
};
