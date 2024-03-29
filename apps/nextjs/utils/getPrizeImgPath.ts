import { StaticImageData } from "next/image";
import major1Prize from "~/images/systems/prizes/major_1.png";

export function getPrizeImgPath(prizeImg: string) {
  const prizeList: {
    [x: string]: StaticImageData;
  } = {
    major_1: major1Prize,
  };
  return prizeList?.[prizeImg];
  // return isSkin ? `${getBaseUrl()}/assets/${prizeImg}` : freebetPath.src;
}
