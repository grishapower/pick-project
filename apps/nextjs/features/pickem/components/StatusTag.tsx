import { PickemStageStatusEnum, Stage } from "@pickem/shared";
import { useTranslations } from "next-intl";
import { CountdownWrap, Text } from "~/components";

type Props = {
  stagesData: Stage[];
};

export const StatusTag = ({ stagesData }: Props) => {
  const t = useTranslations();
  //TODO: remove it. Move it to backend status
  const isTournamentComing = stagesData?.every(
    (i) => i.stageStatus === PickemStageStatusEnum.Coming,
  );
  const isTournamentEnded = stagesData?.every(
    (i) => i.stageStatus === PickemStageStatusEnum.End,
  );
  const isWaitingStage = stagesData?.find(
    (i) => i.stageStatus === PickemStageStatusEnum.Waiting,
  );

  const isComingStage = stagesData?.find(
    (i) => i.stageStatus === PickemStageStatusEnum.Coming,
  );

  const isWaitingDoneStage = stagesData?.find(
    (i) => i.stageStatus === PickemStageStatusEnum.Waiting_done,
  );

  const currStage = isWaitingStage || isWaitingDoneStage || isComingStage;

  return (
    <div className="bg-darkGrey inline-block rounded p-2">
      <Text className="text-silver">
        {currStage && (
          <div>
            {t("pickem.tagFirstText")}
            {` ${currStage.name} `}
            {currStage?.stageStatus === PickemStageStatusEnum.Coming
              ? t("pickem.tagTextStart")
              : t("pickem.tagTextEnd")}
            <CountdownWrap
              date={
                currStage?.stageStatus === PickemStageStatusEnum.Coming
                  ? currStage.start_date
                  : currStage.end_date
              }
            />
          </div>
        )}
        {isTournamentEnded && t("pickem.tagTournamentEnd")}
      </Text>
    </div>
  );
};
