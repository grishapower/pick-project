import cn from "classnames";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode | undefined;
  drawBracket: boolean;
  drawLine: boolean;
};

export const PlayoffPair = ({ children, drawBracket, drawLine }: Props) => {
  return (
    <div
      className={cn("playoff-pair ", {
        ["connection-bracket"]: drawBracket,
        ["connection-line"]: drawLine,
      })}
    >
      {children}
    </div>
  );
};
