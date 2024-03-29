import cn from "classnames";

type SkeletonProps = {
  className?: string;
};

export const Skeleton = (props: SkeletonProps) => {
  const { className } = props;
  return (
    <div className={cn("bg-darkGrey animate-pulse rounded-lg", className)} />
  );
};
