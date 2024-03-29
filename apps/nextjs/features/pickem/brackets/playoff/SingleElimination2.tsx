import { PlayoffBracketSingleElim2Type, Rounds } from "@pickem/shared";
import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Text } from "~/components";
import { ROUND_TITLE, TEAMS_INFO } from "~/constants";
import { CheckIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";

const NEXT_ROUND = {
  [Rounds.Quaterfinal]: Rounds.Semifinal,
  [Rounds.Semifinal]: Rounds.Final,
  [Rounds.Final]: Rounds.Winner,
  [Rounds.Winner]: undefined,
};

const PREV_VALUES = {
  [Rounds.Winner]: Rounds.Final,
  [Rounds.Final]: Rounds.Semifinal,
  [Rounds.Semifinal]: Rounds.Quaterfinal,
  [Rounds.Quaterfinal]: undefined,
};

type Props = {
  userBracket: PlayoffBracketSingleElim2Type;
  handleUpdateBracket: (bracket: any) => void;
  correctAnswers: any;
  stageEnd: boolean;
  stageDisabled: boolean;
  stageComing: boolean;
};

export const SingleElimination2 = ({
  userBracket,
  handleUpdateBracket,
  correctAnswers,
  stageComing,
  stageEnd,
  stageDisabled,
}: Props) => {
  const t = useTranslations();

  const userBracketKeys = Object.keys(userBracket) as Rounds[];

  const selectTeam = (
    id: number,
    round: Rounds,
    pairIdx: number,
    position: "top" | "bot",
  ) => {
    const copyUserBracket = { ...userBracket };

    const nextRound = NEXT_ROUND[round];
    const isNextRoundFinal = nextRound === Rounds.Final; //в этой сетке это последний раунд
    const isNextRoundWinner = nextRound === Rounds.Winner; //в этой сетке это последний раунд
    const nextPair =
      nextRound && nextRound === Rounds.Final ? `pair1` : `pair${pairIdx}`;

    if (!nextRound) {
      return false;
    }

    //проверяем свободный слот сверху вниз
    //winner всегда 1, так что там только top
    const isTopFreeSlot = isNextRoundWinner
      ? true
      : !userBracket[nextRound]?.[nextPair]?.top?.id;

    // copyUserBracket[round]![`pair${pairIdx}`]![position]!.selected = true;

    if (!isNextRoundFinal) {
      copyUserBracket[nextRound]![nextPair]![isTopFreeSlot ? "top" : "bot"] = {
        id: id,
        initial: false,
      };
    } else {
      copyUserBracket[nextRound]![nextPair]![pairIdx === 1 ? "top" : "bot"] = {
        id: id,
        initial: false,
      };
    }

    handleUpdateBracket(copyUserBracket);
  };

  const removeTeam = (
    id: number,
    round: Rounds,
    pairIdx: number,
    position: "top" | "bot",
  ) => {
    const copyUserBracket = { ...userBracket };
    const currentPair = `pair${pairIdx}`;

    copyUserBracket[round]![currentPair]![position] = {
      id: null,
      initial: false,
    };

    let idToNullify = id;
    copyUserBracket![round]![currentPair]![position]!.id = null;

    const roundKeys = Object.keys(copyUserBracket) as Rounds[];
    const startUpdating = roundKeys.indexOf(round);

    for (let i = startUpdating; i < roundKeys.length; i++) {
      const round1 = roundKeys[i];
      if (!round1) return;
      for (const pair in copyUserBracket[round1]) {
        for (const pos in copyUserBracket[round1]?.[pair]) {
          const typedPos = pos as "top" | "bot";
          if (copyUserBracket[round1]?.[pair]?.[typedPos]?.id === idToNullify) {
            copyUserBracket[round1]![pair]![typedPos]!.id = null;
          }
        }
      }
    }

    handleUpdateBracket(copyUserBracket);
  };

  return (
    <>
      <div className="flex justify-between">
        {userBracketKeys.map((round, colIdx) => {
          return (
            <div style={{ width: `${100 / userBracketKeys.length}%` }}>
              <Text className="text-center">{t(ROUND_TITLE[round])}</Text>
            </div>
          );
        })}
      </div>
      <div className="playoff-table playoff-table-se2">
        {userBracketKeys.map((round, colIdx) => {
          const pairs = userBracket[round];
          const prevRound = PREV_VALUES[round];

          const isLastColumn = userBracketKeys.length - 1 === colIdx;
          const isNextRoundFinal = userBracketKeys[colIdx + 1] === "final";

          if (!pairs) return false;

          //TODO Create Componennt  by PAIR
          return (
            <div
              className={cn("playoff-column", {
                ["connection-line"]: isNextRoundFinal,
              })}
              key={round}
            >
              {Object.values(pairs).map((pair, pairIdx) => {
                const currentPairIdx = pairIdx + 1; //храним в виде pair1/pair2
                const teamTop = pair?.top?.id
                  ? TEAMS_INFO?.[pair.top.id]
                  : undefined;
                const teamBot = pair?.bot?.id
                  ? TEAMS_INFO?.[pair.bot.id]
                  : undefined;

                let pontentialBotTeam;
                let pontentialTopTeam;

                if (round === Rounds.Final) {
                  pontentialTopTeam =
                    prevRound &&
                    `${
                      TEAMS_INFO?.[userBracket[prevRound]?.[`pair1`]?.top.id!]
                        ?.name || "TBA"
                    }/${
                      TEAMS_INFO?.[userBracket[prevRound]?.[`pair1`]?.bot?.id!]
                        ?.name || "TBA"
                    }`;

                  pontentialBotTeam =
                    prevRound &&
                    `${
                      TEAMS_INFO?.[userBracket[prevRound]?.[`pair2`]?.top.id!]
                        ?.name || "TBA"
                    }/${
                      TEAMS_INFO?.[userBracket[prevRound]?.[`pair2`]?.bot?.id!]
                        ?.name || "TBA"
                    }`;
                } else {
                  pontentialBotTeam =
                    prevRound &&
                    `${
                      TEAMS_INFO?.[
                        userBracket[prevRound]?.[`pair${currentPairIdx}`]?.top
                          .id!
                      ]?.name || "TBA"
                    }/${
                      TEAMS_INFO?.[
                        userBracket[prevRound]?.[`pair${currentPairIdx}`]?.bot
                          ?.id!
                      ]?.name || "TBA"
                    }`;
                }

                const isTopPositionCorrectAnswer =
                  stageEnd &&
                  correctAnswers?.[round]?.[`pair${currentPairIdx}`] ===
                    pair.top?.id;
                // pair.top.selected;

                const isBotPositionCorrectAnswer =
                  stageEnd &&
                  correctAnswers?.[round]?.[`pair${currentPairIdx}`] ===
                    pair.bot?.id;
                // pair.bot?.selected;

                return (
                  <div
                    className={cn("playoff-pair", {
                      ["connection-line"]: !isLastColumn && !isNextRoundFinal,
                    })}
                    key={`pair${pairIdx}`}
                  >
                    <div
                      className={cn("playoff-team bg-bgMain relative", {
                        ["green-gradient-big"]:
                          isTopPositionCorrectAnswer && stageEnd,
                        ["red-gradient-big"]:
                          !isTopPositionCorrectAnswer && stageEnd,
                        ["cursor-pointer"]: !stageEnd && !stageDisabled,
                        ["pointer-events-none select-none"]:
                          stageEnd || stageDisabled,
                        ["dashed-square rounded-lg"]:
                          !stageComing && !pair.top.initial && !stageEnd,
                      })}
                      onClick={() =>
                        pair.top &&
                        pair.top.id &&
                        !stageEnd &&
                        !stageDisabled &&
                        selectTeam(pair.top.id, round, currentPairIdx, "top")
                      }
                    >
                      {teamTop ? (
                        <>
                          <Image
                            className="h-8 w-8"
                            src={teamTop?.icon || ""}
                            alt=""
                          />
                          {teamTop.name}
                          {!pair.top.initial && !stageEnd ? (
                            <CloseIcon
                              className="mr fill-darkGrey ml-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                pair.top?.id &&
                                  removeTeam(
                                    pair.top.id,
                                    round,
                                    currentPairIdx,
                                    "top",
                                  );
                              }}
                            />
                          ) : null}
                        </>
                      ) : (
                        stageEnd && (
                          <Text className="text-grey text-xs">
                            Не было выбрано
                          </Text>
                        )
                      )}
                      {pontentialTopTeam &&
                      !teamTop &&
                      !stageEnd &&
                      !stageComing ? (
                        <Text className="text-darkGrey text-lg">
                          {pontentialTopTeam}
                        </Text>
                      ) : null}
                      {stageEnd ? (
                        isTopPositionCorrectAnswer ? (
                          <CheckIcon className="mr ml-auto" />
                        ) : (
                          <CloseIcon className="fill-red mr ml-auto" />
                        )
                      ) : null}
                    </div>
                    {pair.bot !== undefined ? ( //null - не выбрано, undefined - нет (только для виннер)
                      <div
                        className={cn("playoff-team bg-bgMain", {
                          ["green-gradient-big"]:
                            isBotPositionCorrectAnswer && stageEnd,
                          ["red-gradient-big"]:
                            !isBotPositionCorrectAnswer && stageEnd,
                          ["cursor-pointer"]: !stageEnd && !stageDisabled,
                          ["pointer-events-none select-none"]:
                            stageEnd || stageDisabled,
                          ["dashed-square rounded-lg"]:
                            !stageComing && !pair.bot.initial && !stageEnd,
                        })}
                        onClick={() =>
                          pair.bot &&
                          pair.bot.id &&
                          !stageEnd &&
                          !stageDisabled &&
                          selectTeam(pair.bot.id, round, currentPairIdx, "bot")
                        }
                      >
                        {teamBot ? (
                          <>
                            <Image
                              className="h-8 w-8"
                              src={teamBot?.icon || ""}
                              alt=""
                            />
                            {teamBot.name}
                            {!pair.bot.initial && !stageEnd ? (
                              <CloseIcon
                                className="mr fill-darkGrey ml-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  pair.bot?.id &&
                                    removeTeam(
                                      pair.bot.id,
                                      round,
                                      currentPairIdx,
                                      "bot",
                                    );
                                }}
                              />
                            ) : null}
                          </>
                        ) : (
                          stageEnd && (
                            <Text className="text-grey text-xs">
                              Не было выбрано
                            </Text>
                          )
                        )}

                        {pontentialBotTeam &&
                        !teamBot &&
                        !stageEnd &&
                        !stageComing ? (
                          <Text className="text-darkGrey text-lg">
                            {pontentialBotTeam}
                          </Text>
                        ) : null}
                        {stageEnd ? (
                          isBotPositionCorrectAnswer ? (
                            <CheckIcon className="mr ml-auto" />
                          ) : (
                            <CloseIcon className="fill-red mr ml-auto" />
                          )
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
