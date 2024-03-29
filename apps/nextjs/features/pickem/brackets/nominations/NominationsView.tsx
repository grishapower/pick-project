import {
  BRACKET_BY_ENUM,
  PickemData,
  PickemNominationsEnum,
} from "@pickem/shared";
import cn from "classnames";
import _groupBy from "lodash.groupby";
import { useTranslations } from "next-intl";
import { StaticImageData } from "next/image";
import { Text } from "~/components";
import { MAPS_INFO, TEAMS_INFO } from "~/constants";
import { PLAYERS_INFO } from "~/constants/players-info";
import { NominationCard } from "./NominationsCard";

type Props = {
  initialBracket: keyof typeof BRACKET_BY_ENUM.NOMINATION;
  userBracket: PickemData["stages"];
  correctAnswers: any;
  cardClick?: (nomination: {
    title: string;
    id: PickemNominationsEnum;
    type: string;
    titleKey: string;
  }) => void;
  stageEnd: boolean;
  disabled: boolean;
  stageComing: boolean;
  viewMode?: boolean;
};

//remove it
export const NominationsView = ({
  initialBracket,
  userBracket,
  correctAnswers,

  cardClick,
  stageEnd,
  disabled,
  stageComing,
  viewMode,
}: Props) => {
  const t = useTranslations();

  const nominationsList =
    BRACKET_BY_ENUM.NOMINATION[
      initialBracket as keyof typeof BRACKET_BY_ENUM.NOMINATION
    ];

  const groupedNominations = _groupBy(Object.values(nominationsList), "type");

  const order = {
    player: 1,
    team: 2,
    map: 3,
  };

  const groupedNominationsKeys = Object.keys(groupedNominations).sort(
    (a, b) => order[a as keyof typeof order] - order[b as keyof typeof order],
  ) as (keyof typeof groupedNominations)[];

  const nominationGroupName = {
    player: t("pickem.nominationGroupPlayers"),
    team: t("pickem.nominationGroupTeams"),
    map: t("pickem.nominationGroupMaps"),
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {groupedNominationsKeys.map((type, idx) => {
        const nominationGroup = groupedNominations[type];

        return (
          <div
            key={type}
            className={cn({
              ["w-full max-w-[434px]"]: idx !== 0,
            })}
          >
            <div className="mb-4 flex items-center ">
              <Text className="text-grey text-xl">
                {nominationGroupName[type as keyof typeof nominationGroupName]}
              </Text>
              <div className="bg-darkGrey ml-2 mr-2 h-[1px] w-full" />
            </div>
            <div className=" flex flex-wrap justify-center gap-4 sm:justify-start">
              {nominationGroup?.map((nomination) => {
                const selected = userBracket[nomination.id as any];

                let imgPath: StaticImageData | undefined;
                let text: string | undefined;
                let logo: StaticImageData | undefined;

                if (type === "map") {
                  imgPath = MAPS_INFO[selected]?.img;
                  text = MAPS_INFO[selected]?.name;
                }
                if (type === "player") {
                  imgPath = PLAYERS_INFO[selected]?.image;
                  text = PLAYERS_INFO[selected]?.nickname;
                  logo = TEAMS_INFO[PLAYERS_INFO[selected]?.team || 0]?.icon;
                }

                if (type === "team") {
                  imgPath = TEAMS_INFO[selected]?.icon;
                  text = TEAMS_INFO[selected]?.name;
                }

                return (
                  <NominationCard
                    key={nomination.title}
                    title={t(nomination.titleKey)}
                    id={nomination.id}
                    selected={!!selected}
                    type={nomination.type}
                    onClick={() => cardClick && cardClick(nomination)}
                    isAnswerCorrect={
                      correctAnswers?.[nomination.id] === selected
                    }
                    stageEnd={stageEnd}
                    disabled={disabled}
                    stageComing={stageComing}
                    viewMode={viewMode}
                    showResult={!!correctAnswers && stageEnd}
                    //new
                    img={imgPath}
                    text={text}
                    logo={logo}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
