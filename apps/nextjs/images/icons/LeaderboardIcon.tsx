import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const LeaderboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 0C13.1046 0 14 0.89543 14 2V5H18C19.1046 5 20 5.89543 20 7V16C20 17.1046 19.1046 18 18 18H2C0.89543 18 0 17.1046 0 16V10C0 8.8954 0.89543 8 2 8H6V2C6 0.89543 6.89543 0 8 0H12ZM12 2H8V16H12V2ZM18 7H14V16H18V7ZM6 10H2V16H6V10Z"
      fill="#8B9094"
    />
  </BaseSVG>
);
