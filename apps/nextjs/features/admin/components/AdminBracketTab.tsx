import { STAGE_ORDER } from "@pickem/api/src/helpers/stageSort";
import {
  BracketTypeEnum,
  BRACKET_BY_ENUM,
  StageTypeEnum,
} from "@pickem/shared";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Heading, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

export const AdminBracketTab = () => {
  const params = useParams();
  const tournamentId = params!.id as string;

  const [bracketsInfo, setBracketsInfo] = useState<
    {
      bracket: any;
      bracketType: BracketTypeEnum;
      stageType: StageTypeEnum;
    }[]
  >([]);

  const { data: bracketsData } =
    trpc.brackets.getBracketByTournamentId.useQuery({ tournamentId });

  const {
    mutate: addBracketStageByTournamentDB,
    isLoading: loadingAddBracketStageByTournamentDB,
  } = trpc.admin.updateBracketStage.useMutation();

  const handleUpdateBracketsInfo = (val: any, idx: number) => {
    setBracketsInfo((prev) => {
      const arr = [...prev];

      if (!arr?.[idx]?.bracket) return arr;

      arr[idx]!.bracket = val;

      return arr;
    });
  };

  const handleUpdateBracketType = (
    val: any,
    idx: number,
    type: StageTypeEnum,
  ) => {
    setBracketsInfo((prev) => {
      const arr = [...prev];
      if (!arr?.[idx]?.bracketType) return arr;
      arr[idx]!.bracketType = val;
      //@ts-ignore
      const insertBracket = BRACKET_BY_ENUM[type][val];

      if (type === "NOMINATION") {
        //удаляем лишнее
        for (const key in insertBracket) {
          insertBracket[key] = "";
        }
      }

      arr[idx]!.bracket = insertBracket;

      return arr;
    });
  };

  const handleUpdateBracketDB = (stageName: StageTypeEnum) => {
    const findBracket = bracketsInfo.find((i) => i.stageType === stageName);
    addBracketStageByTournamentDB({
      tournamentId,
      data: findBracket,
    });
  };

  useEffect(() => {
    if (bracketsData) {
      setBracketsInfo(
        bracketsData
          .sort((a, b) => STAGE_ORDER[a.stageType] - STAGE_ORDER[b.stageType])
          .map((i) => ({
            ...i,
            bracket: i.bracket,
          })),
      );
    }
  }, [bracketsData]);

  return (
    <div className="mb-4">
      <Text className="text-xl">Сетки стадий:</Text>
      <div className="mb-3 flex flex-wrap gap-4">
        {bracketsInfo.map((bracket, idx) => {
          const bracketsSets = Object.keys(BRACKET_BY_ENUM[bracket.stageType]);

          return (
            <div key={idx}>
              <Text className="text-lg">
                Сетка для стадии: {bracket.stageType}
              </Text>
              <div>
                <div>
                  <div className="flex gap-3">
                    <div>
                      <Text>Bracket JSON</Text>
                      <textarea
                        className="w-[500px] text-black"
                        onChange={({ target }) =>
                          handleUpdateBracketsInfo(
                            JSON.parse(target.value),
                            idx,
                          )
                        }
                        value={JSON.stringify(bracket.bracket, undefined, 4)}
                      />
                    </div>

                    <div>
                      <Text>Bracket type</Text>
                      <select
                        className="text-black"
                        value={bracket.bracketType}
                        onChange={({ target }) =>
                          handleUpdateBracketType(
                            target.value,
                            idx,
                            bracket.stageType,
                          )
                        }
                      >
                        {bracketsSets.map((i) => (
                          <option>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleUpdateBracketDB(bracket.stageType)}
                    isLoading={loadingAddBracketStageByTournamentDB}
                  >
                    Обновить сетку стадии в бд
                  </Button>

                  <Heading className="text-2xl">Превью:</Heading>
                  <div className="bg-bgMain">
                    {JSON.stringify(bracket.bracket)}
                  </div>
                </div>

                {/* <Button */}
                {/* text="Добавить сетку" */}
                {/* onClick={() => addBracketForStage(stage.type)} */}
                {/* /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
