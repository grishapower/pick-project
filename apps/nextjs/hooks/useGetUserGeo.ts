"use client";

import { useGeo } from "~/contexts/GeoContext";

//remove no needed hook
export const useGetUserGeo = () => {
  const { geo, isLoading } = useGeo();

  if (isLoading) return "";

  return geo === "ru" ? "ru" : "en";
};
