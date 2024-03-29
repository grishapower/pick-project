import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const MedalIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.41968 0C7.1374 0 7.8001 0.38457 8.1562 1.00772L9 2.48447L9.8439 1.00772C10.2 0.38457 10.8626 0 11.5804 0H16.1384C17.2902 0 18.0122 1.24422 17.4408 2.24421L14.0592 8.1621C15.2615 9.4191 16 11.1233 16 13C16 16.866 12.866 20 9 20C5.13401 20 2 16.866 2 13C2 11.1233 2.73855 9.419 3.94087 8.1621L0.559227 2.24421C-0.0121931 1.24422 0.709857 0 1.86159 0H6.41968ZM9 8C6.23858 8 4 10.2386 4 13C4 15.7614 6.23858 18 9 18C11.7614 18 14 15.7614 14 13C14 10.2386 11.7614 8 9 8ZM9 11C10.1046 11 11 11.8954 11 13C11 14.1046 10.1046 15 9 15C7.8954 15 7 14.1046 7 13C7 11.8954 7.8954 11 9 11ZM15.2769 2H11.5804L10.1518 4.50003L11.2129 6.35698C11.6518 6.50312 12.0714 6.69156 12.4669 6.91744L15.2769 2ZM6.41968 2H2.72318L5.53314 6.91743C6.47618 6.37877 7.5566 6.0531 8.7088 6.00595L6.41968 2Z"
    />
  </BaseSVG>
);