import { Fragment } from "react";
import { LeaderboardIcon, ScoreIcon, StageIcon } from "~/images/icons";
import { Text } from "./ui/Text";

export const DefaultPickemInfo = () => {
  return (
    <Fragment>
      <Text className="mb-4 truncate text-xl font-bold">Katowice</Text>
      <div className="mb-2 flex gap-2">
        <div className="bg-bgSecond flex w-[196px] items-start gap-2 rounded-2xl px-4 py-[12px]">
          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
            <LeaderboardIcon />
          </div>
          <div>
            <Text className="text-grey text-xs">Current position</Text>
            <Text className="text-xl font-bold">
              <>
                {0} из {100}
              </>
            </Text>
          </div>
        </div>
        <div className="bg-bgSecond flex w-[133px] items-start gap-2 rounded-2xl px-4 py-[12px]">
          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
            <ScoreIcon />
          </div>
          <div>
            <Text className="text-grey text-xs">Points</Text>
            <Text className="text-xl font-bold">0</Text>
          </div>
        </div>
      </div>

      <div className="bg-bgMain flex h-[68px] justify-between rounded-lg">
        <div className="flex-center gap-2 px-4">
          <div className="bg-darkGrey flex-center h-10 w-10 rounded-lg">
            <StageIcon />
          </div>
          <div>
            <Text className="text-grey text-xs">Stage tournament</Text>
            <Text className="truncate text-xl font-bold">Group stage</Text>
          </div>
        </div>
        <div className="bg-yellow flex-center flex-col rounded-lg px-3">
          <Text className="truncate text-xs text-black">Make a prediction</Text>
          <Text className="flex gap-1 text-xl font-bold text-black">
            3д 16ч
          </Text>
        </div>
      </div>
    </Fragment>
  );
};
