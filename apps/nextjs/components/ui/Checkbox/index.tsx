import { Text } from "~/components";

type Props = {
  checked: boolean;
  label?: string;
  onClick: () => void;
};
export const Checkbox = ({ checked, label, onClick }: Props) => {
  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={onClick}>
      <div className="bg-bgMain relative h-6 w-6 rounded-[4px]">
        {checked ? (
          <div className="bg-lightBlue absolute left-1 top-1 h-4 w-4 rounded-[4px]" />
        ) : null}
      </div>
      {label ? (
        <Text className="text-grey text-xs sm:text-base">{label}</Text>
      ) : null}
    </div>
  );
};
