//@ts-nocheck
"use client";
import { StageRow, TournamentApi } from "@pickem/shared";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

const NEW_STAGE = {
  end_date: "",
  name: "",
  serie_id_api: 0,
  stage_id_api: 0,
  start_date: "",
  teams: [],
  tournament_id: "",
  type: "PLAYOFF" as "GROUP" | "PLAYOFF",
};

export const AdminStageTab = ({}) => {
  const params = useParams();
  const tournamentId = params!.id as string;

  const [stagesInfo, setStagesInfo] = useState<StageRow[]>([]);

  //query
  const { data: tournamentData } = trpc.tournaments.getTournamentById.useQuery({
    tournamentId,
  });

  const { data: stagesDataFromApi } =
    trpc.pandascore.getApiTournamentById.useQuery(
      { id: tournamentData?.serie_id_api! },
      { enabled: Boolean(tournamentData?.serie_id_api) },
    );

  const { data: stagesDataFromDb } =
    trpc.stages.getFullRecordByTournamentId.useQuery(tournamentId);

  const {
    mutate: addStageByTournamentDB,
    isLoading: loadingAddStageByTournamentDB,
  } = trpc.admin.addStageByTournamentDB.useMutation();

  const addStageFromAPI = (stage: TournamentApi) => {
    const stageType = stage.name.toLowerCase().includes("group")
      ? "GROUP"
      : "PLAYOFF";

    setStagesInfo((prev) => [
      ...prev,
      {
        end_date: stage.end_at || "",
        name: stage.name,
        stage_id_api: stage.id,
        start_date: stage.begin_at || "",
        teams: stage.teams.map((i) => i.id),
        serie_id_api: tournamentData!.serie_id_api!,
        tournament_id: tournamentId || "",
        type: stageType || "",
      },
    ]);
  };

  const handleUpdateStageInfo = (
    idxStage: number,
    key: keyof Omit<StageRow, "id" | "created_at">,
    val: any,
  ) => {
    setStagesInfo((prev) => {
      const arr = [...prev];

      //@ts-ignore
      arr[idxStage][key] = val;

      return arr;
    });
  };

  const addNewStage = () => {
    setStagesInfo((prev) => [
      ...prev,
      {
        ...NEW_STAGE,
        serie_id_api: tournamentData?.serie_id_api!,
        tournament_id: tournamentId,
      },
    ]);
  };

  const removeStage = (idx: number) => {
    setStagesInfo((prev) => {
      const arr = [...prev];
      arr.splice(idx, 1);
      return arr;
    });
  };

  const addStageToDB = (stage: any) => {
    addStageByTournamentDB({ data: stage });
  };

  useEffect(() => {
    if (stagesDataFromDb) {
      setStagesInfo(stagesDataFromDb);
    }
  });

  return (
    <div>
      <Heading className="mb-4 text-2xl">НАСТРОЙКА СТАДИЙ</Heading>
      <div className="mb-4">
        <Text className="text-xl">Стадии турнира</Text>
        <div className="mb-4 inline-block border p-2">
          <Text>Стадии из API</Text>
          <div className="flex gap-4">
            {stagesDataFromApi?.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer"
                onClick={() => addStageFromAPI(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-4">
          {stagesInfo.map((stage, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-3">
                <div>
                  <Text>Название стадии (name)</Text>
                  <input
                    className="text-black"
                    onChange={({ target }) =>
                      handleUpdateStageInfo(idx, "name", target.value)
                    }
                    value={stage.name}
                  />
                </div>
                <div>
                  <Text>Начало стадии (start_date)</Text>
                  <input
                    className="text-black"
                    onChange={({ target }) =>
                      handleUpdateStageInfo(idx, "start_date", target.value)
                    }
                    value={stage.start_date}
                  />
                </div>
                <div>
                  <Text>Конец стадии (end_date)</Text>
                  <input
                    className="text-black"
                    onChange={({ target }) =>
                      handleUpdateStageInfo(idx, "end_date", target.value)
                    }
                    value={stage.end_date}
                  />
                </div>
                <div>
                  <Text>Команд стадии</Text>
                  <input
                    className="text-black"
                    onChange={({ target }) =>
                      handleUpdateStageInfo(
                        idx,
                        "teams",
                        target.value.split(","),
                      )
                    }
                    value={stage.teams.toString()}
                  />
                </div>
                <div>
                  <Text>Тип стадии</Text>
                  <select
                    className="text-black"
                    value={stage.type}
                    onChange={({ target }) =>
                      handleUpdateStageInfo(idx, "type", target.value)
                    }
                  >
                    <option>GROUP</option>
                    <option>PLAYOFF</option>
                  </select>
                </div>
                <div>
                  <Text>Серия ID (из API)</Text>
                  <input
                    className="text-black"
                    disabled
                    value={stage.serie_id_api}
                  />
                </div>
                <div>
                  <Text>Стадия ID (из API)</Text>
                  <input
                    className="text-black"
                    value={stage.stage_id_api}
                    onChange={({ target }) =>
                      handleUpdateStageInfo(idx, "stage_id_api", target.value)
                    }
                  />
                </div>
                <Button
                  onClick={() => addStageToDB(stage)}
                  isLoading={loadingAddStageByTournamentDB}
                >
                  Обновить стадию в бд
                </Button>
                <Button onClick={() => removeStage(idx)}>Удалить стадию</Button>
              </div>
            );
          })}

          <Button onClick={addNewStage}>Добавить еще стадию</Button>
        </div>
      </div>
    </div>
  );
};
