import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const CheckIconBorder = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="1" width="18" height="18" rx="6.33333" fill="#98B818" />
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="6.33333"
      stroke="#222429"
      strokeWidth="2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9907 6.86177C15.2511 7.12212 15.2511 7.54423 14.9907 7.80458L9.4954 13.2999C9.20902 13.5863 8.7447 13.5863 8.45831 13.2999L5.52924 10.2186C5.2689 9.95825 5.2689 9.53612 5.52924 9.27579C5.78959 9.01545 6.2117 9.01545 6.47205 9.27579L8.97686 11.9328L14.0479 6.86177C14.3083 6.60142 14.7304 6.60142 14.9907 6.86177Z"
      fill="white"
    />
  </BaseSVG>
);
