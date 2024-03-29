import { GroupBracketSwissType } from "@pickem/shared";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import OutsideClickHandler from "react-outside-click-handler";
import { Tooltip } from "react-tooltip";
import { CustomScrollbar, Heading, Text } from "~/components";
import { TEAMS_INFO } from "~/constants";
import { GroupCard } from "./GroupCard";

type Props = {
  teams: (keyof typeof TEAMS_INFO)[];
  stageDisabled: boolean;
  stageEnd: boolean;
  correctAnswers: any;
  userBracket: GroupBracketSwissType;
  handleRemove?: (
    stage: keyof GroupBracketSwissType,
    teamId: number,
    name?: "lose" | "win",
  ) => void;
  viewMode?: boolean;
  stageComing: boolean;
  handleClickFromTooltip: (
    teamId: number,
    stage: keyof GroupBracketSwissType,
    position?: any,
  ) => void;
  pickedTeams: number[];
  isNowDrag: boolean;
};

export const GroupSwiss1View = ({
  teams,
  stageDisabled,
  stageEnd,
  correctAnswers,
  userBracket,
  handleRemove,
  viewMode,
  stageComing,
  handleClickFromTooltip,
  pickedTeams,
  isNowDrag,
}: Props) => {
  const t = useTranslations();
  const [idTooptip, setIdTooptip] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClickTooltip = (teamId: number) => {
    if (idTooptip === "zeroWin") {
      handleClickFromTooltip(teamId, "zero", "win");
    }

    if (idTooptip === "zeroLose") {
      handleClickFromTooltip(teamId, "zero", "lose");
    }

    if (idTooptip.includes("listTeam")) {
      handleClickFromTooltip(
        teamId,
        "listTeam",
        idTooptip[idTooptip.length - 1],
      );
    }

    setShowTooltip(false);
  };

  const handleMobileSelect = (tooltipId: string) => () => {
    if (isMobile) {
      setIdTooptip(tooltipId);
      setShowTooltip(true);
    }
  };

  const availableItems = teams.filter((i) => !pickedTeams.includes(i));

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-5 sm:justify-between sm:gap-0">
          <div className="bg-bgMain border-bgSecond flex w-full max-w-[420px] rounded-2xl border">
            <div className="flex-center order-2 w-full max-w-[209px] px-4 text-center sm:order-1">
              <div>
                <Heading className="text-5xl sm:text-[64px]">3-0</Heading>
                <Text className="text-grey max-w-[170px] text-xs">
                  {t("pickem.pickemGroupSwissZeroWin")}
                </Text>
              </div>
            </div>
            <div className="order-1 w-full sm:order-2">
              <GroupCard
                id="zeroWin"
                onClickSelect={handleMobileSelect("zeroWin")}
                stageDisabled={stageDisabled}
                stageEnd={stageEnd}
                stageComing={stageComing}
                isAnswerCorrect={
                  correctAnswers &&
                  correctAnswers?.zero?.win?.includes(userBracket.zero.win?.[0])
                }
                img={TEAMS_INFO[userBracket.zero.win?.[0] || 0]?.icon}
                selected={!!userBracket.zero.win[0]}
                position="win"
                stage="zero"
                handleRemove={() =>
                  handleRemove && // TODO FIX IT
                  handleRemove("zero", userBracket.zero.win[0]!, "win")
                }
                showResult={stageEnd && !!correctAnswers}
                viewMode={viewMode}
                size="xl"
                isNowDrag={isNowDrag}
              />
            </div>
          </div>
          <div className="bg-bgMain border-bgSecond flex w-full max-w-[420px] rounded-2xl border">
            <GroupCard
              id="zeroLose"
              onClickSelect={handleMobileSelect("zeroLose")}
              stageDisabled={stageDisabled}
              stageEnd={stageEnd}
              stageComing={stageComing}
              isAnswerCorrect={correctAnswers?.zero?.lose?.includes(
                userBracket.zero.lose?.[0],
              )}
              selected={!!userBracket.zero.lose[0]}
              img={TEAMS_INFO[userBracket.zero.lose?.[0] || 0]?.icon}
              position="lose"
              stage="zero"
              handleRemove={() =>
                handleRemove &&
                handleRemove("zero", userBracket.zero.lose[0]!, "lose")
              }
              showResult={stageEnd && !!correctAnswers}
              viewMode={viewMode}
              size="xl"
              isNowDrag={isNowDrag}
            />
            <div className="flex-center w-full max-w-[209px] px-4 text-center">
              <div>
                <Heading className="text-5xl sm:text-[64px]">0-3</Heading>
                <Text className="text-grey max-w-[170px] text-xs">
                  {t("pickem.pickemGroupSwissZeroLose")}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Text className="text-grey mb-2 text-center text-sm">
          {t("pickem.pickemGroupSwissSelectTeams1")}{" "}
          <span className="font-bold">
            7 {t("pickem.pickemGroupSwissSelectTeams2")},
          </span>{" "}
          {t("pickem.pickemGroupSwissSelectTeams3")}
          <span className="font-bold">
            {t("pickem.pickemGroupSwissSelectTeams4")}
          </span>
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          {Array.from(
            { length: (teams.length - 1) / 2 },
            (_, index) => index,
          ).map((teamId, idx) => {
            const fromUserBracket = userBracket.listTeam?.[
              idx
            ] as keyof typeof TEAMS_INFO;

            return (
              <GroupCard
                key={idx}
                id={`listTeam${idx}`}
                onClickSelect={handleMobileSelect(`listTeam${idx}`)}
                stageDisabled={stageDisabled}
                stageEnd={stageEnd}
                stageComing={stageComing}
                isAnswerCorrect={
                  correctAnswers &&
                  correctAnswers?.listTeam?.includes(fromUserBracket)
                }
                selected={!!fromUserBracket}
                img={TEAMS_INFO[fromUserBracket]?.icon}
                position={idx}
                stage="listTeam"
                handleRemove={() =>
                  userBracket.listTeam[idx] &&
                  handleRemove &&
                  handleRemove("listTeam", fromUserBracket)
                }
                showResult={stageEnd && !!correctAnswers}
                viewMode={viewMode}
                size="sm"
                isNowDrag={isNowDrag}
              />
            );
          })}
        </div>
      </div>
      {availableItems.length > 0 && (
        <OutsideClickHandler onOutsideClick={() => setShowTooltip(false)}>
          <Tooltip
            id={idTooptip}
            place="right"
            className="bg-bgSecond z-10 rounded-2xl p-3 shadow-[0px_4px_10px_0px_#00000040]"
            isOpen={showTooltip}
            anchorSelect={idTooptip && `#${idTooptip}`}
            opacity={100}
            noArrow
            disableStyleInjection
            clickable
            openEvents={{ focus: true }}
          >
            <CustomScrollbar
              scrollbar={{
                autoHeight: true,
                autoHeightMax: 200,
                autoHide: false,
              }}
            >
              {availableItems.map((team) => {
                return (
                  <div
                    key={team}
                    className="mb-4 flex cursor-pointer items-center gap-2 pr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTooltip(team);
                    }}
                  >
                    <Image
                      src={TEAMS_INFO[team]?.icon || ""}
                      alt=""
                      className="h-8 w-8"
                    />
                    <Text className="text-base">{TEAMS_INFO[team]?.name}</Text>
                  </div>
                );
              })}
            </CustomScrollbar>
          </Tooltip>
        </OutsideClickHandler>
      )}
    </div>
  );
};
