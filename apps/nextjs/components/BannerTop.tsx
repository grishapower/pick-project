"use client";

import { useEffect, useState } from "react";
import { AdBannerTop } from "./Banners/AdBannerTop";

export const BannerTop = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // hotifx ssr При первом рендеринге компонента на клиенте
  }, []);

  if (!isClient) {
    return <div className="h-[96px]" />;
  }

  // if (geo === "ru") {
  //   return <CoefficientBanner />;
  // }

  return <AdBannerTop />;
};
