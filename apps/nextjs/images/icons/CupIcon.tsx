import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const CupIcon = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG
    width="20"
    height="18"
    viewBox="0 0 20 18"
    xmlns="http://www.w3.org/2000/svg"
    fill="#8B9094"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6176 0C15.6263 0 16.4771 0.75107 16.6022 1.75193L16.7582 3H17.4268C18.8719 3 19.9558 4.32212 19.6724 5.7392L19.4713 6.74466C19.1601 8.3007 17.9816 9.4983 16.4997 9.8752C15.4927 12.0102 13.4583 13.5902 11.0004 13.9313V16H14.0004C14.5527 16 15.0004 16.4477 15.0004 17C15.0004 17.5523 14.5527 18 14.0004 18H6.00042C5.44813 18 5.00042 17.5523 5.00042 17C5.00042 16.4477 5.44813 16 6.00042 16H9.00039V13.9313C6.54252 13.5902 4.50812 12.0102 3.50111 9.8752C2.01923 9.4983 0.840751 8.3007 0.529551 6.74466L0.328451 5.7392C0.0450411 4.32212 1.12892 3 2.57406 3H3.24264L3.39864 1.75193C3.52375 0.75107 4.37455 0 5.3832 0H14.6176ZM14.6176 2H5.3832L4.86094 6.17809C4.47452 9.2695 6.88497 12 10.0004 12C13.1159 12 15.5263 9.2695 15.1399 6.17809L14.6176 2ZM17.4268 5H17.0082L17.1245 5.93002C17.1753 6.3364 17.1912 6.73828 17.1747 7.1329C17.3037 6.95032 17.4041 6.74486 17.4686 6.52238L17.5101 6.35243L17.7112 5.34697C17.7426 5.18991 17.6414 5.04206 17.493 5.00755L17.4268 5ZM2.99264 5H2.57406C2.39101 5 2.25372 5.16747 2.28962 5.34697L2.49071 6.35243C2.54836 6.6407 2.66483 6.90467 2.82612 7.1329C2.80966 6.73828 2.82559 6.3364 2.87638 5.93002L2.99264 5Z"
    />
  </BaseSVG>
);