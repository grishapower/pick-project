import { Stage } from "@pickem/shared";
import { Heading } from "~/components";
import { PICKEM_ITEMS } from "../utils/pickem-items";
import { PickemSidebarMobile } from "./PickemSidebarMobile";
import { StatusTag } from "./StatusTag";

type Props = {
  title?: string;
  stagesData: Stage[];
  selectedItem: PICKEM_ITEMS | string;
  setItem: (x: PICKEM_ITEMS | string) => void;
};

export const PickemHeaderMobile = ({
  title,
  stagesData,
  selectedItem,
  setItem,
}: Props) => {
  return (
    <div className="bg-bgSecond -ml-4 -mr-4 -mt-8 mb-6 pt-6 text-center sm:hidden">
      <Heading className="mb-2 text-center text-[28px]">{title}</Heading>
      <div className="mb-4">
        <StatusTag stagesData={stagesData || []} />
      </div>

      <PickemSidebarMobile
        selectedItem={selectedItem}
        setItem={setItem}
        stagesData={stagesData || []}
      />
    </div>
  );
};
