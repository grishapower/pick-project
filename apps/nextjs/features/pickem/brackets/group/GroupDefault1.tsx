//@ts-nocheck

import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  BracketTypeEnum,
  GroupBracketDefaultPositionType,
  GroupBracketDefaultType,
  PickemData,
  Rounds,
  StageTypeEnum,
  Team,
} from "@pickem/shared";
import cn from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Button, Text } from "~/components";
import { TEAMS_INFO } from "~/constants";
import { isNumber } from "~/utils/isNumber";
import { Draggable } from "../../components/Draggable";
import { extractValuesObj } from "../../utils/extractValuesObj";
import { CardRow } from "./CardRow";

type Props = {
  onSave: (data: PickemData["stages"]) => void;
  updateLoading?: boolean;
  userPickemData?: GroupBracketDefaultType | null;
  correctAnswers: any;
  // stageData: Stage[];
  stageData: any; //TODO: сейчас эта сетка не поддерживается, потом переделать
  initialBracket: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  };
  stageDisabled: boolean;
  stageEnd: boolean;
};

export const GroupDefault1 = ({
  onSave,
  updateLoading,
  userPickemData,
  correctAnswers,
  stageData,
  initialBracket,
  stageDisabled,
  stageEnd,
}: Props) => {
  //айдишники что бы понимать какие команды уже выбраны
  const [pickedTeams, setPickedTeams] = useState<number[]>([]);
  //по стейту этому строится сетка + данные пользователя
  //мержим стандартную сетку и пикем юзера
  const [userPickem, setUserPickem] = useState<GroupBracketDefaultType>({
    ...(initialBracket?.bracket || {}),
    ...userPickemData,
  });
  //текущий dragElement
  const [currDragElem, setCurrDragElem] = useState<number>();

  const handleRemove = (
    stage: Rounds,
    name: keyof GroupBracketDefaultPositionType,
    id: number,
  ) => {
    setPickedTeams((prev) => [...prev].filter((i) => i !== id));

    setUserPickem((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [stage]: {
          ...prev[stage],
          [name]: null,
        },
      };
    });
  };

  useEffect(() => {
    if (userPickemData) {
      // setUserPickem(userPickemData);
      setPickedTeams(extractValuesObj(userPickemData));
    }
  }, [userPickemData]);

  const handleDragStart = (
    event: DragStartEvent & {
      active: { data: { current: Team & { group: string } } };
    },
  ) => {
    setCurrDragElem(+event.active.data.current.group);
  };

  const handleDragCancel = () => {
    setCurrDragElem(undefined);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const teamId = event.active.id as number;
    const draggableItemData = event.active.data.current!;
    const droppablePlace = event.over;

    const droppablePlaceData = droppablePlace?.data.current as {
      position: keyof GroupBracketDefaultPositionType;
      stage: Rounds;
    };

    //значит отпустили где то в другом месте
    if (!droppablePlace?.id || !droppablePlaceData) {
      return setCurrDragElem(undefined);
    }
    const draggableTeam = teamId;

    if (!draggableTeam) return false;

    setUserPickem((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [droppablePlaceData.stage]: {
          ...prev[droppablePlaceData.stage],
          [droppablePlaceData.position]: teamId,
        },
      };
    });

    setPickedTeams((prev) => [...prev, teamId]);

    setCurrDragElem(undefined);
  };

  const allowedDragByGroup = useMemo(() => {
    let allowedSemifinals = [0, 1];
    let allowedQuaterfinals = [0, 1];

    if (!userPickem) {
      return {
        [Rounds["Semifinal"]]: allowedSemifinals,
        [Rounds["Quaterfinal"]]: allowedQuaterfinals,
      };
    }

    // у нас две группы по этому делим на 2
    const maxPickSemifinal =
      Object.keys(userPickem["semifinal"] || []).length / 2;
    const maxPickQuaterfinal =
      Object.keys(userPickem["quaterfinal"] || []).length / 2;

    let count = {
      0: {
        [Rounds["Semifinal"]]: 0,
        [Rounds["Quaterfinal"]]: 0,
      },
      1: {
        [Rounds["Semifinal"]]: 0,
        [Rounds["Quaterfinal"]]: 0,
      },
    };

    const teamsGroupSet = new Map();
    stageData.forEach((i, idx) => {
      i.teams.forEach((j) => teamsGroupSet.set(j, idx));
    });

    Object.values(userPickem.semifinal || []).forEach((i) => {
      if (!isNumber(teamsGroupSet.get(i))) return;

      count[teamsGroupSet.get(i) as keyof typeof count][
        Rounds["Semifinal"]
      ] += 1;
    });

    Object.values(userPickem.quaterfinal || []).forEach((i) => {
      if (!teamsGroupSet.get(i)) return;
      count[teamsGroupSet.get(i) as keyof typeof count]["quaterfinal"] += 1;
    });

    if (count[0].semifinal - maxPickSemifinal === 0) {
      allowedSemifinals = allowedSemifinals.filter((i) => i !== 0);
    }
    if (count[0].quaterfinal - maxPickQuaterfinal === 0) {
      allowedQuaterfinals = allowedQuaterfinals.filter((i) => i !== 0);
    }

    if (count[1].semifinal - maxPickSemifinal === 0) {
      allowedSemifinals = allowedSemifinals.filter((i) => i !== 1);
    }
    if (count[1].quaterfinal - maxPickQuaterfinal === 0) {
      allowedQuaterfinals = allowedQuaterfinals.filter((i) => i !== 1);
    }

    return {
      [Rounds["Semifinal"]]: allowedSemifinals,
      [Rounds["Quaterfinal"]]: allowedQuaterfinals,
    };
  }, [pickedTeams, stageData, userPickem]);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <div className="relative mb-4">
        <div className="bg-bgSecond border-bgBlue mb-4 flex h-14 items-center rounded-2xl border-2 pl-6">
          <Text className="text-xl font-bold">Группа А</Text>
        </div>

        <div className="bg-bgSecond border-bgBlue mb-4 flex h-14 items-center rounded-2xl border-2 pl-6">
          <Text className="text-xl font-bold">Группа B</Text>
        </div>

        <div className="mb-4 flex items-center justify-around gap-2">
          {stageData?.map((item, idx) => {
            return (
              <div className="bg-bgSecond  rounded-2xl px-[46px] py-4">
                <Text className="mb-2 text-center text-base">{item.name}</Text>
                <div className="mb-2 flex items-center justify-center gap-[10px]">
                  {item.teams.map((team) => {
                    const teamInfo = TEAMS_INFO[team];
                    if (!teamInfo) return false;

                    const picked = pickedTeams.includes(team);
                    return (
                      <div
                        key={teamInfo.id}
                        className={cn(
                          "bg-bgMain flex h-10 w-10 items-center justify-center rounded-[4px]",
                          {
                            ["border-darkGrey select-none border opacity-30"]:
                              picked,
                            ["pointer-events-none select-none"]:
                              stageEnd || stageDisabled,
                          },
                        )}
                      >
                        <Draggable
                          id={teamInfo.id}
                          data={{
                            // ...teamInfo,
                            group: idx,
                            stage: Rounds.Semifinal,
                          }}
                          key={teamInfo.id}
                          disabled={!!picked || stageDisabled || stageEnd}
                        >
                          {<img src={teamInfo.img || ""} alt="" />}
                        </Draggable>
                      </div>
                    );
                  })}
                </div>

                <Text className="text-grey text-xs">
                  Выберите команду и перетащите в свободный слот
                </Text>
              </div>
            );
          })}
        </div>

        <div className="mb-6">
          <CardRow
            title="Выход в полуфинал"
            subtitle="Команды которые обеспечат себе прямой выход в полуфинал победив в 2
            матчах"
            stage={Rounds.Semifinal}
            userPickem={userPickem}
            handleRemove={handleRemove}
            allowedDrop={allowedDragByGroup["semifinal"]}
            currDragElem={currDragElem}
            stageEnd={stageEnd}
            correctAnswers={correctAnswers}
          />
        </div>

        <div>
          <CardRow
            title="Выход в четверть финал"
            stage={Rounds.Quaterfinal}
            userPickem={userPickem}
            handleRemove={handleRemove}
            allowedDrop={allowedDragByGroup["quaterfinal"]}
            currDragElem={currDragElem}
            stageEnd={stageEnd}
            correctAnswers={correctAnswers}
          />
        </div>
      </div>

      {!stageEnd ? (
        <Button
          size="md"
          isLoading={updateLoading}
          className="ml-auto block"
          type="primary"
          disabled={stageDisabled || stageEnd}
          onClick={() => userPickem && onSave(userPickem)}
        >
          Сохранить прогноз
        </Button>
      ) : null}
    </DndContext>
  );
};
