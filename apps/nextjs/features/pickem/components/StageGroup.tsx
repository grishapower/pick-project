"use client";

import { BracketTypeEnum, Stage, StageTypeEnum } from "@pickem/shared";
import { GroupDefault1 } from "../brackets/group/GroupDefault1";
import { GroupSwiss1 } from "../brackets/group/GroupSwiss1";

type Props = {
  onSave: (data: any) => void;
  updateLoading: boolean;
  userPickemData?: any | null;
  correctAnswers: any;
  stageData: Stage;
  initialBracket: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  };
  viewMode: boolean;
};

export const StageGroup = ({
  onSave,
  updateLoading,
  userPickemData,
  correctAnswers,
  stageData,
  initialBracket,
  viewMode,
}: Props) => {
  const stageComing = stageData?.stageStatus === "coming";
  const stageEnd = stageData?.stageStatus === "end";

  return (
    <div>
      {initialBracket.bracketType === "GROUP_DEFAULT_1" && (
        <GroupDefault1
          onSave={onSave}
          updateLoading={updateLoading}
          userPickemData={userPickemData}
          correctAnswers={correctAnswers}
          stageData={stageData}
          initialBracket={initialBracket}
          stageDisabled={stageComing}
          stageEnd={stageEnd}
        />
      )}

      {initialBracket.bracketType === "GROUP_SWISS_1" && (
        <GroupSwiss1
          onSave={onSave}
          updateLoading={updateLoading}
          userPickemData={userPickemData}
          correctAnswers={correctAnswers}
          stageData={stageData}
          initialBracket={initialBracket}
          stageDisabled={stageComing || viewMode}
          stageComing={stageComing}
          stageEnd={stageEnd}
          viewMode={viewMode}
        />
      )}
    </div>
  );
};
