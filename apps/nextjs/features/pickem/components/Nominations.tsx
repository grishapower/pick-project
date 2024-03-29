import {
  BracketTypeEnum,
  BRACKET_BY_ENUM,
  PickemData,
  PickemNominationsEnum,
  PickemStageStatusEnum,
  Stage,
  StageTypeEnum,
} from "@pickem/shared";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  AuthButton,
  Button,
  MapsModal,
  PlayersModal,
  TeamsModal,
} from "~/components";
import { useGetSession } from "~/hooks/useGetSession";
import { NominationsView } from "../brackets/nominations/NominationsView";

type Props = {
  userPickemData?: PickemData["stages"];
  onSave: (data: PickemData["stages"]) => void;
  updateLoading: boolean;
  correctAnswers: any;
  initialBracket: {
    bracket: any;
    bracketType: BracketTypeEnum;
    stageType: StageTypeEnum;
  };
  stageData?: Stage;
  viewMode: boolean;
};

export const Nominations = ({
  userPickemData,
  onSave,
  updateLoading,
  correctAnswers,
  stageData,
  initialBracket,
  viewMode,
}: Props) => {
  if (!stageData) return false;

  const session = useGetSession();
  const t = useTranslations();

  const stageStatus = stageData.stageStatus;
  const stageEnd = stageData.stageStatus === PickemStageStatusEnum.End;
  const stageDisabled =
    stageData.stageStatus === PickemStageStatusEnum.Coming ||
    stageData.stageStatus === PickemStageStatusEnum.End ||
    viewMode;
  const stageComing =
    stageStatus && stageStatus === PickemStageStatusEnum.Coming;

  const [nominationsState, setNominationsState] = useState<
    PickemData["stages"]
  >({});

  const [nominationModalOpen, setNominationModalOpen] = useState<
    | {
        type: string;
        id: PickemNominationsEnum;
        title: string;
        titleKey: string;
      }
    | undefined
  >();

  useEffect(() => {
    setNominationsState(userPickemData || {});
  }, [userPickemData]);

  const handleCloseModal = () => {
    setNominationModalOpen(undefined);
  };

  const handleOpenModal = (nomination: {
    type: string;
    id: PickemNominationsEnum;
    title: string;
    titleKey: string;
  }) => {
    setNominationModalOpen({
      type: nomination.type,
      id: nomination.id,
      title: nomination.title,
      titleKey: nomination.titleKey,
    });
  };

  const handleSelect = (value: number) => {
    if (!nominationModalOpen) return false;

    setNominationsState(
      (prev) =>
        prev && {
          ...prev,
          [nominationModalOpen.id]: value,
        },
    );
    setNominationModalOpen(undefined);
  };

  return (
    <div>
      <NominationsView
        initialBracket={
          initialBracket.bracketType as keyof typeof BRACKET_BY_ENUM.NOMINATION
        }
        userBracket={nominationsState}
        correctAnswers={correctAnswers}
        cardClick={handleOpenModal}
        stageEnd={stageEnd}
        disabled={stageDisabled}
        stageComing={stageComing}
        viewMode={viewMode}
      />

      {!session.isAuth && (
        <AuthButton className="m-auto block sm:ml-auto sm:mr-0" />
      )}
      {session.isAuth && !stageEnd && !viewMode && (
        <Button
          size="md"
          isLoading={updateLoading}
          className="m-auto block sm:ml-auto sm:mr-0"
          type="primary"
          onClick={() => nominationsState && onSave(nominationsState)}
          disabled={stageDisabled}
        >
          {t("pickem.pickemSaveBtn")}
        </Button>
      )}

      {nominationModalOpen && nominationModalOpen.type === "map" && (
        <MapsModal
          isOpen={!!nominationModalOpen}
          handleCloseModal={handleCloseModal}
          onSelect={handleSelect}
          selected={nominationsState?.[nominationModalOpen.id]} //TODO: костыль из-за предпоказа избавиться после
          title={t(nominationModalOpen.titleKey)}
        />
      )}

      {nominationModalOpen && nominationModalOpen.type === "player" && (
        <PlayersModal
          isOpen={!!nominationModalOpen}
          handleCloseModal={handleCloseModal}
          onSelect={handleSelect}
          selected={nominationsState?.[nominationModalOpen.id]}
          title={t(nominationModalOpen.titleKey)}
          teams={stageData.teams}
        />
      )}

      {nominationModalOpen && nominationModalOpen.type === "team" && (
        <TeamsModal
          isOpen={!!nominationModalOpen}
          handleCloseModal={handleCloseModal}
          onSelect={handleSelect}
          selected={nominationsState?.[nominationModalOpen.id]}
          title={t(nominationModalOpen.titleKey)}
          teams={stageData.teams}
        />
      )}
    </div>
  );
};
