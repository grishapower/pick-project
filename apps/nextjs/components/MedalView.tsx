import Image from "next/image";

import rmrMajorLevel0 from "~/images/systems/medal/0.png";
import rmrMajorLevel1 from "~/images/systems/medal/1.png";
import rmrMajorLevel2 from "~/images/systems/medal/2.png";
import rmrMajorLevel3 from "~/images/systems/medal/3.png";
import rmrMajorLevel4 from "~/images/systems/medal/4.png";
import rmrMajorPreview from "~/images/systems/medal/preview.png";
import { isNumber } from "~/utils/isNumber";

type Props = {
  level?: number;
  name?: string;
  className?: string;
  width?: number;
  height?: number;
};

export const MedalView = (props: Props) => {
  //after first release change it 100% now i dont have time and strength
  const medalBylevel = {
    0: rmrMajorLevel0,
    1: rmrMajorLevel1,
    2: rmrMajorLevel2,
    3: rmrMajorLevel3,
    4: rmrMajorLevel4,
  };

  return (
    <Image
      src={
        isNumber(props.level)
          ? medalBylevel[props.level as keyof typeof medalBylevel]
          : rmrMajorPreview
      }
      alt=""
      unoptimized
      {...props}
    />
  );
};
