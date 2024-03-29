import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 0C3.80558 0 0 3.80558 0 8.5C0 13.1944 3.80558 17 8.5 17C10.4869 17 12.3146 16.3183 13.7619 15.176L17.4142 18.8283C17.8047 19.2188 18.4379 19.2188 18.8284 18.8283C19.2189 18.4378 19.2189 17.8046 18.8284 17.4141L15.1761 13.7618C16.3183 12.3145 17 10.4868 17 8.5C17 3.80558 13.1944 0 8.5 0ZM2 8.5C2 4.91015 4.91015 2 8.5 2C12.0899 2 15 4.91015 15 8.5C15 12.0899 12.0899 15 8.5 15C4.91015 15 2 12.0899 2 8.5Z"
      fill="#48616F"
    />
  </BaseSVG>
);
