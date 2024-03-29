import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const SteamSquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG viewBox="0 0 512 512" fill="#ebebeb" {...props}>
    <rect width="512" height="512" rx="15%" fill="#231f20" />

    <path d="m183 280 41 28 27 41 87-62-94-96" />

    <circle cx="340" cy="190" r="49" />

    <g fill="none" stroke="#ebebeb">
      <circle cx="179" cy="352" r="63" strokeWidth="19" />

      <path d="m-18 271 195 81" strokeWidth="80" strokeLinecap="round" />

      <circle cx="340" cy="190" r="81" strokeWidth="32" />
    </g>
  </BaseSVG>
);
