import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Text } from "~/components";
import { TEAMS_INFO } from "~/constants";
import { Draggable } from "../../components/Draggable";

type Props = {
  teams: number[];
  selectedTeams: number[];
  // stageEnd: boolean
  disabled: boolean;
  title?: string;
};

export const GroupHeader = ({
  teams,
  disabled,
  title,
  selectedTeams,
}: Props) => {
  const t = useTranslations();

  return (
    <div className="bg-bgSecond rounded-2xl px-8 py-4 sm:px-[46px]">
      {/* {title && <Text className="mb-2 text-center text-base">{title}</Text>} */}
      <div className="mb-2 flex flex-wrap items-center justify-center gap-[10px]">
        {teams
          .filter((i) => !selectedTeams.includes(i))
          .map((team, idx) => {
            const teamInfo = TEAMS_INFO[team as keyof typeof TEAMS_INFO];
            // if (!teamInfo) return false;

            const picked = selectedTeams.includes(team);
            const disableTeam = disabled || !!picked;
            return (
              <div
                key={teamInfo?.id || idx + "team"}
                className={cn(
                  "bg-bgMain flex h-[48px] w-[48px] items-center justify-center rounded-[4px] p-1",
                  {
                    ["border-darkGrey select-none border opacity-30"]: picked,
                    ["pointer-events-none select-none"]: disableTeam, // stageEnd || stageDisabled,
                  },
                )}
              >
                <Draggable
                  id={teamInfo?.id || ""}
                  data={{
                    group: idx,
                  }}
                  key={teamInfo?.id}
                  disabled={disableTeam}
                >
                  {teamInfo?.icon && (
                    <Image
                      src={teamInfo?.icon}
                      alt=""
                      className="shakeAnimation h-[35px] w-[35px]"
                    />
                  )}
                  {/* <img  /> */}
                </Draggable>
              </div>
            );
          })}
      </div>

      <Text className="text-grey text-center text-xs">
        {t("pickem.pickemGroupSwissHeader")}
      </Text>
    </div>
  );
};
