import { SVGProps } from "react";

export type SvgProps = SVGProps<SVGSVGElement>;

export const BaseSVG = (props: SvgProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" {...props} />;
};
