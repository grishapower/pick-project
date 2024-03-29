"use client";

import Image from "next/image";
import { MainSlider, PickemsSlider } from "~/components";
import { MatchesTwitch } from "~/components/MatchesTwitch";
import tempImg from "~/images/arts/temp-img-main.png";

export const Main = () => {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between sm:mb-12 sm:flex-nowrap">
        <MainSlider />
        <PickemsSlider />
      </div>

      <MatchesTwitch />

      <Image src={tempImg} alt="" className="mt-12" />
    </>
  );
};
