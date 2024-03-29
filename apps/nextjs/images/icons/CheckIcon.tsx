import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="16"
    height="11"
    viewBox="0 0 16 11"
    xmlns="http://www.w3.org/2000/svg"
    fill="#98B818"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9851 0.292897C15.3756 0.683417 15.3756 1.31659 14.9851 1.70711L6.74213 9.95015C6.31255 10.3796 5.61607 10.3796 5.18649 9.95015L0.79289 5.32812C0.40237 4.93762 0.40237 4.30443 0.79289 3.91393C1.18341 3.52343 1.81658 3.52343 2.2071 3.91393L5.96431 7.89945L13.5709 0.292897C13.9614 -0.0976325 14.5946 -0.0976325 14.9851 0.292897Z"
      // fill="#98B818"
    />
  </BaseSVG>
);
