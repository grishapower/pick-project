import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  BracketTypeEnum,
  GroupBracketSwissType,
  Stage,
  StageTypeEnum,
} from "@pickem/shared";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AuthButton, Button } from "~/components";
import { useGetSession } from "~/hooks/useGetSession";
import { extractValuesObj } from "../../utils/extractValuesObj";
import { GroupHeader } from "./GroupHeader";
import { GroupSwiss1View } from "./GroupSwiss1View";

type Props = {
  stageEnd: boolean;
  stageDisabled: boolean;
  onSave: (data: any) => void;
  updateLoading: boolean;
  userPickemData?: GroupBracketSwissType | null;
  correctAnswers: any;
  initialBracket: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  };
  stageData: Stage;
  viewMode: boolean;
  stageComing: boolean;
};

export const GroupSwiss1 = ({
  stageEnd,
  stageDisabled,
  onSave,
  updateLoading,
  initialBracket,
  userPickemData,
  correctAnswers,
  viewMode,
  stageData,
  stageComing,
}: Props) => {
  const session = useGetSession();
  const t = useTranslations();

  const [userBracket, setUserBracket] = useState<GroupBracketSwissType>({
    ...(initialBracket?.bracket || {}),
    ...userPickemData,
  });

  const [isNowDrag, setNowDrag] = useState(false);

  //айдишники что бы понимать какие команды уже выбраны
  const [pickedTeams, setPickedTeams] = useState<number[]>([]);

  useEffect(() => {
    setUserBracket({
      ...(initialBracket?.bracket || {}),
      ...userPickemData,
    });
    setPickedTeams(extractValuesObj(userPickemData));
  }, [userPickemData]);

  const handleRemove = (
    stage: keyof GroupBracketSwissType,
    teamId: number,
    name?: "lose" | "win",
  ) => {
    setPickedTeams((prev) => [...prev].filter((i) => i !== teamId));

    if (stage === "zero") {
      setUserBracket((prev) => {
        if (!prev || !name) return prev;
        return {
          ...prev,
          [stage]: {
            ...prev[stage],
            [name]: [...prev[stage][name as "lose" | "win"]].filter(
              (i) => i !== teamId,
            ),
          },
        };
      });
    }

    if (stage === "listTeam") {
      setUserBracket((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          [stage]: [...prev[stage]].map((i) => (i === teamId ? null : i)),
        };
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const teamId = event.active.id as number;

    const droppablePlaceData = event.over?.data?.current as {
      position: string;
      stage: keyof GroupBracketSwissType;
    };
    //значит отпустили где то в другом месте
    if (!event.over?.id || !droppablePlaceData) {
      setNowDrag(false);
      return false;
    }

    setUserBracket((prev) => {
      let newState = { ...prev };

      //todo: rewrite it
      if (droppablePlaceData.stage === "zero") {
        newState = {
          ...newState,
          [droppablePlaceData.stage]: {
            ...newState[droppablePlaceData.stage],
            [droppablePlaceData.position]: [teamId],
          },
        };
      }

      if (droppablePlaceData.stage === "listTeam") {
        newState.listTeam[+droppablePlaceData.position] = teamId;
      }

      return newState;
    });

    setPickedTeams((prev) => [...prev, teamId]);
    setNowDrag(false);
  };

  const handleClickFromTooltip = (
    teamId: number,
    stage: keyof GroupBracketSwissType,
    position?: any,
  ) => {
    setUserBracket((prev) => {
      let newState = { ...prev };

      //todo: rewrite it
      if (stage === "zero") {
        newState = {
          ...newState,
          [stage]: {
            ...newState[stage],
            [position]: [teamId],
          },
        };
      }

      if (stage === "listTeam") {
        newState.listTeam[position] = teamId;
      }

      return newState;
    });
    setPickedTeams((prev) => [...prev, teamId]);
  };

  const handleDragStart = () => {
    setNowDrag(true);
  };

  const handleDragCancel = () => {
    console.log("end drag");
    setNowDrag(false);
  };

  return (
    <div>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
      >
        <div className="mb-6 sm:mb-4">
          <div className="mb-6">
            <GroupHeader
              disabled={false}
              teams={stageData.teams}
              selectedTeams={pickedTeams}
              title="Команды"
            />
          </div>

          <GroupSwiss1View
            isNowDrag={isNowDrag}
            correctAnswers={correctAnswers}
            stageDisabled={stageDisabled}
            stageEnd={stageEnd}
            teams={stageData.teams}
            userBracket={userBracket}
            handleRemove={handleRemove}
            stageComing={stageComing}
            handleClickFromTooltip={handleClickFromTooltip}
            pickedTeams={pickedTeams}
          />
        </div>
      </DndContext>

      {!session.isAuth && (
        <AuthButton className="m-auto block sm:ml-auto sm:mr-0" />
      )}

      {session.isAuth && !stageEnd && !viewMode && (
        <Button
          size="md"
          isLoading={updateLoading}
          className="m-auto block sm:mr-0"
          type="primary"
          disabled={stageDisabled || stageEnd}
          onClick={() => !stageDisabled && onSave(userBracket)}
        >
          {t("pickem.pickemSaveBtn")}
        </Button>
      )}
    </div>
  );
};
