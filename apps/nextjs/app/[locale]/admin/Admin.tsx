"use client";

import { useState } from "react";
import { TournamentsListDb } from "~/features/admin";

export const Admin = () => {
  const [showPage, setShowPage] = useState<"api" | "db">("db");

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {/* <Text
          className={cn("cursor-pointer text-2xl", {
            ["text-blueMain"]: showPage === "db",
          })}
          onClick={() => setShowPage("db")}
        >
          Управление
        </Text> */}
      </div>
      {/* {showPage === "api" && <TournamentsListApi />} */}
      {showPage === "db" && <TournamentsListDb />}
    </>
  );
};
