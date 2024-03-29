import {
  BracketTypeEnum,
  PickemStageStatusEnum,
  PlayoffBracketSingleElim2Type,
  PlayoffStageStructure,
  Stage,
  StageTypeEnum,
} from "@pickem/shared";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { AuthButton, Button, Heading } from "~/components";
import { Toggle } from "~/components/ui/Toggle";
import { useGetSession } from "~/hooks/useGetSession";
import { SingleElimination1 } from "../brackets/playoff/SingleElimination1";
import { SingleElimination2 } from "../brackets/playoff/SingleElimination2";

type Props = {
  userPickemData?: PlayoffStageStructure | PlayoffBracketSingleElim2Type; //fix it later after first release
  onSave: (data: any) => void;
  correctAnswers: any;
  updateLoading?: boolean;
  //TODO change to DB type
  initialBracket: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  };
  stageData: Stage;
  viewMode: boolean;
};

export const StagePlayoff = ({
  userPickemData,
  onSave,
  correctAnswers,
  updateLoading,
  initialBracket,
  stageData,
  viewMode,
}: Props) => {
  const session = useGetSession();
  const t = useTranslations();

  const stageComing = stageData?.stageStatus === PickemStageStatusEnum.Coming;
  const stageEnd = stageData?.stageStatus === PickemStageStatusEnum.End;

  //мержим стандартную сетку и пикем юзера
  const [userBracket, setUserBracket] = useState<PlayoffBracketSingleElim2Type>(
    {
      ...(initialBracket?.bracket || {}),
      ...userPickemData,
    },
  );
  const [compactСards, setCompactСards] = useState(isMobile);

  useEffect(() => {
    setUserBracket({
      ...(initialBracket?.bracket || {}),
      ...(userPickemData || {}),
    });
  }, [userPickemData]);

  //TODO maybe later change ANY to specific bracket type
  const handleUpdateBracket = (bracket: any) => {
    setUserBracket(bracket);
  };

  return (
    <div className="w-full">
      <div className="bg-bgSecond mb-4 rounded-2xl px-6 py-7">
        <div className="mb-6 flex flex-wrap justify-center sm:mb-0 sm:justify-between">
          <Heading className="mb-1 text-[24px] sm:mb-6 sm:text-[28px]">
            {t("pickem.playoffTitle")}
          </Heading>
          <div>
            <Toggle
              label={t("pickem.playoffCompactCard")}
              onClick={() => setCompactСards((prev) => !prev)}
              toggled={compactСards}
            />
          </div>
        </div>
        {initialBracket.bracketType === "PLAYOFF_SINGLE_ELIMINATION_2" && (
          <SingleElimination2
            userBracket={userBracket}
            handleUpdateBracket={handleUpdateBracket}
            correctAnswers={correctAnswers}
            stageComing={stageComing}
            stageEnd={stageEnd}
            stageDisabled={stageComing || stageEnd}
          />
        )}

        {initialBracket.bracketType === "PLAYOFF_SINGLE_ELIMINATION_1" && (
          <SingleElimination1
            userBracket={userBracket}
            handleUpdateBracket={handleUpdateBracket}
            correctAnswers={correctAnswers}
            stageDisabled={stageComing || stageEnd || viewMode}
            compactСards={compactСards}
          />
        )}
      </div>

      {!session.isAuth && <AuthButton className="ml-auto block" />}
      {session.isAuth && !stageEnd && !viewMode && (
        <Button
          size="md"
          isLoading={updateLoading}
          disabled={stageComing || updateLoading || stageEnd}
          className="mx-auto block sm:ml-auto sm:mr-0"
          type="primary"
          onClick={() => onSave(userBracket)}
        >
          {t("pickem.pickemSaveBtn")}
        </Button>
      )}
    </div>
  );
};
