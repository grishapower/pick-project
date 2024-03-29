"use client";

import { useEffect, useState } from "react";
import { ADS_BANNERS } from "~/constants";
import { useGetUserGeo } from "~/hooks/useGetUserGeo";

export const AdBgBanner = () => {
  const [isClient, setIsClient] = useState(false);
  const geo = useGetUserGeo();

  useEffect(() => {
    setIsClient(true); // При первом рендеринге компонента на клиенте
  }, []);

  if (!isClient) {
    // Возвращаем плейсхолдер или ничего, чтобы соответствовать серверному рендерингу
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        cursor: "pointer",
      }}
      onClick={() =>
        window.open(`${ADS_BANNERS[geo]?.mainSide?.link}`, "_blank")
      }
      className="hidden sm:block"
    >
      <div
        style={{
          backgroundImage: `url(${ADS_BANNERS[geo]?.mainSide?.img?.src})`,
          backgroundRepeat: "no-repeat",
          height: "100%",
          marginTop: 88,
          imageRendering: "auto",
          backgroundPosition: "top center",
          backgroundSize: "auto",
        }}
      ></div>
    </div>
  );
};
