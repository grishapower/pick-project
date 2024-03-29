import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 17C8.5 17.5523 8.9477 18 9.5 18C10.0523 18 10.5 17.5523 10.5 17V10H17.5C18.0523 10 18.5 9.5523 18.5 9C18.5 8.4477 18.0523 8 17.5 8H10.5V1C10.5 0.44772 10.0523 0 9.5 0C8.9477 0 8.5 0.44772 8.5 1V8H1.5C0.94772 8 0.5 8.4477 0.5 9C0.5 9.5523 0.94772 10 1.5 10H8.5V17Z"
      fill="#8B9094"
    />
  </BaseSVG>
);
