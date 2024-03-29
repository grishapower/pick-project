"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const GeoContext = createContext({
  geo: "",
  isLoading: true,
});

export const useGeo = () => {
  return useContext(GeoContext);
};

export function GeoProvider({ children }: PropsWithChildren) {
  const [geoData, setGeoData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    //TODO: move to server later
    fetch("https://ipapi.co/country")
      .then((response) => response.text())
      .then((data) => {
        setGeoData(data.toLowerCase() || "en");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching geo data:", error);
        setGeoData("en");
        setIsLoading(false);
      });
  }, []);

  return (
    <GeoContext.Provider value={{ geo: geoData, isLoading }}>
      {children}
    </GeoContext.Provider>
  );
}
