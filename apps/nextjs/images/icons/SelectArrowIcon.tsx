import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const SelectArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="14"
    height="9"
    viewBox="0 0 14 9"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.00025 5.53586L2.34345 0.878958C1.95295 0.488458 1.31975 0.488458 0.929249 0.878958C0.538749 1.26956 0.538749 1.90266 0.929249 2.29326C6.28115 7.64516 7.00025 8.36426 7.00025 8.36426C7.00025 8.36426 7.7563 7.60832 13.0714 2.29316C13.4619 1.90266 13.4619 1.26956 13.0714 0.878958C12.6808 0.488458 12.0477 0.488458 11.6572 0.878958L7.00025 5.53586Z"
      fill="#8B9094"
    />
  </BaseSVG>
);
