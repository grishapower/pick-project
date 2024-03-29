import { SVGProps } from "react";
import { BaseSVG } from "./BaseSVG";

export const SliderButton = (props: SVGProps<SVGSVGElement>) => (
  <BaseSVG width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0H8ZM11.2929 14.9498C10.9024 15.3403 10.9024 15.9735 11.2929 16.364L16.9498 22.0209C17.3403 22.4114 17.9735 22.4114 18.364 22.0209C18.7545 21.6303 18.7545 20.9972 18.364 20.6066L13.4142 15.6569L18.364 10.7071C18.7545 10.3166 18.7545 9.68342 18.364 9.2929C17.9735 8.90237 17.3403 8.90237 16.9498 9.2929L11.2929 14.9498Z"
      fill="white"
    />
  </BaseSVG>
);
