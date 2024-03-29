import { PropsWithChildren, useState } from "react";
import type { Props as ModalProps } from "react-modal";
import { BaseModal, Button, Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

type Props = {
  handleCloseModal: () => void;
} & ModalProps;

export const TournamentApiModal = ({
  isOpen,
  handleCloseModal,
}: PropsWithChildren<Props>) => {
  const { data, isLoading } = trpc.pandascore.getAllSeries.useQuery();
  const { mutate: addTournament, isLoading: addTournamentLoading } =
    trpc.admin.addTournamentDB.useMutation();

  const [infoTournament, setInfoTournament] = useState({
    full_name: "",
    img: "",
    league_id_api: "",
    name: "",
    serie_id_api: "",
    slug: "",
    end_date: "2024-01-31 00:00:00+00",
    start_date: "2024-01-31 00:00:00+00",
  });

  const addTournamentFunc = async (tournament: any) => {
    setInfoTournament({
      full_name: tournament.full_name || "Заполните",
      img: tournament.league.image_url || "Заполните",
      league_id_api: tournament.league_id || "Заполните",
      name: tournament.name || "Заполните",
      serie_id_api: tournament.id || "Заполните",
      slug: tournament.slug || "Заполните",
      end_date: tournament.end_at || "Заполните",
      start_date: tournament.begin_at || "Заполните",
    });
  };

  const handleUpdateInfo = (key: any, value: any) => {
    setInfoTournament((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addTournamentToDB = () => {
    addTournament({ data: infoTournament });
  };

  const infoTournamentKeys = Object.keys(
    infoTournament,
  ) as (keyof typeof infoTournament)[];

  return (
    <BaseModal isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <Heading className="mb-4 text-2xl">Tournaments List:</Heading>
      <div className="flex items-start">
        <div>
          {data &&
            Object.keys(data).map((item) => {
              const typedItem = item as keyof typeof data;

              return (
                <div className="max-w-[400px] border-b-2 py-4">
                  Турниры из API
                  <Heading className="mb-1 text-2xl">
                    Серия - {item} <br />
                  </Heading>
                  <div className="text mb-1">
                    {data[typedItem]?.map((innerItem) => (
                      <div className="mb-2">
                        <Text className="text-2xl">
                          Турнир -{" "}
                          <span
                            className="hover:text-blueMain cursor-pointer"
                            onClick={() => addTournamentFunc(innerItem)}
                          >
                            {innerItem.full_name}
                          </span>
                          :
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="ml-8 max-w-[400px]  py-4">
          <Heading className="mb-1 text-2xl">Настройка турнира в БД</Heading>

          {infoTournamentKeys.map((item) => {
            return (
              <div className="mb-3 flex">
                <Text className="mr-3 text-2xl">{item}:</Text>{" "}
                <input
                  className="p-1 text-lg"
                  value={infoTournament[item]}
                  onChange={(e) => handleUpdateInfo(item, e.target.value)}
                />
              </div>
            );
          })}
          <Button onClick={addTournamentToDB} isLoading={addTournamentLoading}>
            Добавить турнир
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
