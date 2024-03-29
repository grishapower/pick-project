"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";

export const TournamentsListDb = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data } = trpc.admin.getAllTournaments.useQuery();
  const session = useGetSession();

  return (
    <>
      <div>
        <Heading className="mb-4 text-2xl">Турниры в базе данных:</Heading>
        <div className="flex gap-4">
          {data &&
            data
              .sort((a, b) => a.name.length - b.name.length)
              .map((item) => {
                return (
                  <Link
                    className="flex-center w-3/12 rounded-lg border-2 py-4"
                    href={`/admin/${item.id}`}
                    key={item.id}
                  >
                    <div className="mb-3 items-center ">
                      <Heading className="text-2xl">{item.fullName}</Heading>
                      <Text className="mb-1 text-sm">
                        <div>Даты турнира:</div>
                        {dayjs(item.startDate).format("DD.MM.YYYY")} -{" "}
                        {dayjs(item.endData).format("DD.MM.YYYY")}
                      </Text>
                      <Text className="mb-1 text-sm">
                        Участников: {item.participants} <br />
                      </Text>
                    </div>
                  </Link>
                );
              })}

          <div
            className="flex-center w-3/12 cursor-pointer rounded-lg border-2 py-4"
            // href={`/admin/${item.id}`}
            // key={item.id}
            onClick={() => setOpenModal(true)}
          >
            <Heading className="mb-3 items-center text-2xl">Добавить</Heading>
          </div>
        </div>
      </div>
      {/* <TournamentApiModal
        isOpen={openModal}
        handleCloseModal={() => setOpenModal(false)}
      /> */}
    </>
  );
};
