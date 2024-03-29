import { useDroppable } from "@dnd-kit/core";
import cn from "classnames";
import { PropsWithChildren } from "react";

type Props = {
  id: string;
  className?: string;
  disabled?: boolean;
  data: any;
  onClick?: () => void;
};

export const Droppable = ({
  children,
  id,
  className,
  disabled,
  data,
  onClick,
}: PropsWithChildren<Props>) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled,
    data,
  });

  return (
    <div ref={setNodeRef} className={cn(className)} onClick={onClick}>
      {children}
    </div>
  );
};
