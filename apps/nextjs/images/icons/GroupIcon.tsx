import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const GroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#8B9094"
    {...props}
  >
    <rect x="2" y="7" width="20" height="2" rx="1" />
    <rect x="2" y="11" width="20" height="2" rx="1" />
    <rect x="2" y="15" width="20" height="2" rx="1" />
  </BaseSVG>
);
