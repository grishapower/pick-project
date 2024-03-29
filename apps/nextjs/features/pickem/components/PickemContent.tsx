"use client";

import {
  BracketTypeEnum,
  CorrectAnswers,
  Medal,
  PickemData,
  PickemStageEnum,
  Prize,
  Stage,
  StageTypeEnum,
  Task,
  TOURNAMENT_STATUS_ENUM,
} from "@pickem/shared";
import { useTranslations } from "next-intl";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { callToast } from "~/utils/toast";
import { PICKEM_ITEMS } from "../utils/pickem-items";
import { Leadeboard } from "./Leaderboard";
import { Nominations } from "./Nominations";
import { PickemMain } from "./PickemMain";
import { StageGroup } from "./StageGroup";
import { StagePlayoff } from "./StagePlayoff";

type Props = {
  selectedItem: PICKEM_ITEMS | string;
  tournamentId: string;
  stagesData: Stage[];
  userPickemData: PickemData | null | undefined;
  initialBrackets?: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  }[];
  prizes: Prize[];
  correctAnswers?: CorrectAnswers;
  tournamentStatus: TOURNAMENT_STATUS_ENUM;
  viewMode: boolean;
  tasksData: Task[];
  medalData?: Medal;
  tournamentName: string;
};

export const PickemContent = ({
  selectedItem,
  tournamentId,
  stagesData,
  userPickemData,
  initialBrackets,
  prizes,
  correctAnswers,
  tournamentStatus,
  viewMode,
  tasksData,
  medalData,
  tournamentName,
}: Props) => {
  const session = useGetSession();
  const t = useTranslations();

  const { isLoading: updatePickemLoading, mutateAsync: updatePickem } =
    trpc.pickems.updatePickem.useMutation();

  const currentStage = stagesData.find((i) => i.id === selectedItem);

  const playoffInitialBracket = (initialBrackets || []).find(
    (i) => i.stageType === "PLAYOFF",
  );

  const nominationsInitialBracket = (initialBrackets || []).find(
    (i) => i.stageType === "NOMINATION",
  );

  const groupInitialBracket = (initialBrackets || []).find(
    (i) => i.stageType === "GROUP",
  );

  const onSaveStages = async (data: any) => {
    if (!session.data?.userId) return false;
    const findStage = stagesData.find((i) => i.id === selectedItem);
    if (
      findStage &&
      new Date(findStage.end_date).getTime() < new Date().getTime()
    ) {
      return false;
    }

    await updatePickem({
      tournamentId,
      stageId: selectedItem,
      data: data,
    });

    callToast(t("toasts.savePickem"));
  };

  //content
  if (selectedItem === PICKEM_ITEMS.Main) {
    return (
      <PickemMain
        prizes={prizes}
        // countAnswers={countAnswers}
        tasksData={tasksData}
        stages={stagesData}
        medalData={medalData}
        tournamentName={tournamentName}
      />
    );
  }

  if (
    currentStage?.type === PickemStageEnum.Nomination &&
    nominationsInitialBracket
  ) {
    return (
      <Nominations
        stageData={currentStage}
        userPickemData={userPickemData?.stages?.[selectedItem as string]}
        onSave={onSaveStages}
        updateLoading={updatePickemLoading} // remove it
        correctAnswers={correctAnswers?.[selectedItem as string]}
        initialBracket={nominationsInitialBracket}
        viewMode={viewMode}
      />
    );
  }
  if (currentStage?.type === PickemStageEnum.Group && groupInitialBracket) {
    return (
      <StageGroup
        onSave={onSaveStages}
        updateLoading={updatePickemLoading}
        userPickemData={userPickemData?.stages?.[selectedItem as string]}
        // вынести отдельно
        stageData={currentStage}
        correctAnswers={correctAnswers?.[selectedItem as string]}
        initialBracket={groupInitialBracket}
        viewMode={viewMode}
      />
    );
  }
  if (currentStage?.type === PickemStageEnum.Playoff && playoffInitialBracket) {
    return (
      <StagePlayoff
        userPickemData={userPickemData?.stages?.[selectedItem as string]}
        updateLoading={updatePickemLoading}
        initialBracket={playoffInitialBracket}
        onSave={onSaveStages}
        correctAnswers={correctAnswers?.[selectedItem as string]}
        stageData={currentStage}
        viewMode={viewMode}
      />
    );
  }

  if (selectedItem === PICKEM_ITEMS.Leaderboard) {
    return <Leadeboard tournamentId={tournamentId} stages={stagesData} />;
  }
};
