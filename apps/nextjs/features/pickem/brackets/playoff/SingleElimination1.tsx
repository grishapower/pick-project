import {
  PlayoffBracketSingleElim2Type,
  PlayoffStagePosiition,
  Rounds,
} from "@pickem/shared";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { CustomScrollbar, Text } from "~/components";
import { ROUND_TITLE, TEAMS_INFO } from "~/constants";
import { useGetSession } from "~/hooks/useGetSession";
import { PlayoffCell } from "../../components/bracket-components/PlayoffCell";
import { PlayoffColumn } from "../../components/bracket-components/PlayoffColumn";
import { PlayoffPair } from "../../components/bracket-components/PlayoffPair";

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
  handleUpdateBracket?: (bracket: any) => void;
  correctAnswers: any;
  stageDisabled: boolean;
  compactСards: boolean;
};

export const SingleElimination1 = ({
  userBracket,
  handleUpdateBracket,
  correctAnswers,
  stageDisabled,
  compactСards,
}: Props) => {
  const session = useGetSession();

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
    if (!nextRound) return false;

    const nextPair = `pair${Math.round(pairIdx / 2)}`;
    const nextPosition =
      pairIdx % 2 == 0 ? PlayoffStagePosiition.Bot : PlayoffStagePosiition.Top;

    copyUserBracket[nextRound]![nextPair]![nextPosition] = {
      id: id,
      initial: false,
    };

    handleUpdateBracket && handleUpdateBracket(copyUserBracket);
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

    handleUpdateBracket && handleUpdateBracket(copyUserBracket);
  };

  return (
    <>
      <CustomScrollbar
        scrollbar={{
          autoHeight: true,
          autoHeightMax: 550,
        }}
      >
        <div className={cn("playoff-table pb-3")}>
          {userBracketKeys.map((round, colIdx) => {
            const pairs = userBracket[round];
            const prevRound = PREV_VALUES[round];

            const isLastColumn = userBracketKeys.length - 1 === colIdx;
            const isFirstColumn = colIdx === 0;

            if (!pairs) return false;

            const pairGroupLength = Object.values(pairs).length;

            return (
              <PlayoffColumn key={round}>
                <Text className="text-center">{t(ROUND_TITLE[round])}</Text>
                {Object.values(pairs).map((pair, pairIdx) => {
                  const currentPairIdx = pairIdx + 1; //храним в виде pair1/pair2

                  const teamTop = pair?.top?.id
                    ? TEAMS_INFO?.[pair.top.id]
                    : null;
                  const teamBot = pair?.bot?.id
                    ? TEAMS_INFO?.[pair.bot.id]
                    : null;

                  const isTopPositionCorrectAnswer = correctAnswers?.[round]?.[
                    `pair${currentPairIdx}`
                  ]?.includes(pair.top?.id);

                  const isBotPositionCorrectAnswer = correctAnswers?.[round]?.[
                    `pair${currentPairIdx}`
                  ]?.includes(pair.bot?.id);

                  //подумать с этими линиями сейчас криво - не нравится
                  const addConnectionBracket =
                    pairIdx % 2 === 0 && pairGroupLength > 1;

                  return (
                    <PlayoffPair
                      drawBracket={addConnectionBracket}
                      drawLine={!isFirstColumn}
                      key={`pair${pairIdx}`}
                    >
                      <PlayoffCell
                        isShowResult={!!correctAnswers && session.isAuth}
                        isCorrectAnswer={isTopPositionCorrectAnswer}
                        isDisable={stageDisabled}
                        isCompactCards={compactСards}
                        isInitialTeam={pair.top?.initial}
                        closeIconClick={() =>
                          pair.top?.id &&
                          removeTeam(pair.top.id, round, currentPairIdx, "top")
                        }
                        drawBracket={pairGroupLength === 1 && !isLastColumn}
                        teamIcon={teamTop?.icon}
                        teamName={teamTop?.name}
                        cellClick={() =>
                          pair.top?.id &&
                          selectTeam(pair.top.id, round, currentPairIdx, "top")
                        }
                      />

                      {pair.bot !== undefined ? ( //null - не выбрано, undefined - нет (только для виннер)
                        <PlayoffCell
                          isShowResult={!!correctAnswers && session.isAuth}
                          isCorrectAnswer={isBotPositionCorrectAnswer}
                          isDisable={stageDisabled}
                          isCompactCards={compactСards}
                          isInitialTeam={pair.bot?.initial}
                          closeIconClick={() =>
                            pair.bot?.id &&
                            removeTeam(
                              pair.bot.id,
                              round,
                              currentPairIdx,
                              "bot",
                            )
                          }
                          teamIcon={teamBot?.icon}
                          teamName={teamBot?.name}
                          cellClick={() =>
                            pair.bot?.id &&
                            selectTeam(
                              pair.bot.id,
                              round,
                              currentPairIdx,
                              "bot",
                            )
                          }
                        />
                      ) : null}
                    </PlayoffPair>
                  );
                })}
              </PlayoffColumn>
            );
          })}
        </div>
      </CustomScrollbar>
    </>
  );
};
