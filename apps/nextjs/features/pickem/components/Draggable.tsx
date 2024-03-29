import { useDraggable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

type Props = {
  id: string | number;
  disabled?: boolean;
  data: any;
};

export const Draggable = ({
  children,
  id,
  disabled,
  data,
}: PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled,
    data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: "100",
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className="h-full"
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};
