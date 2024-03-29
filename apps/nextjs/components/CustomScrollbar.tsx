"use client";

import { ReactNode } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars-2";

type Props = {
  scrollbar?: ScrollbarProps;
  children: ReactNode;
};
export const CustomScrollbar = ({ scrollbar, children }: Props) => {
  return (
    <Scrollbars
      hideTracksWhenNotNeeded
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          className={style.scrollTrackVertical}
          style={{
            ...style,
            backgroundColor: "#777773",
            right: "0",
            bottom: "0",
            top: "0",
            // borderRadius: "3px",
            width: "5px",
          }}
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          className={style.scrollThumbVertical}
          style={{
            ...style,
            width: "5px",
            backgroundColor: "#373A41",
          }}
        />
      )}
      renderTrackHorizontal={({ style, ...props }) => (
        <div
          {...props}
          className={style.scrollTrackVertical}
          style={{
            ...style,
            backgroundColor: "#777773",
            right: "0",
            bottom: "0",
            left: "0",
            // borderRadius: "3px",
            height: "3px",
          }}
        />
      )}
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          {...props}
          className={style.scrollThumbVertical}
          style={{
            ...style,
            height: "3px",
            backgroundColor: "#373A41",
          }}
        />
      )}
      {...scrollbar}
    >
      {children}
    </Scrollbars>
  );
};
