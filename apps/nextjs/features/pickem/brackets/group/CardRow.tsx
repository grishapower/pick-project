import {
  GroupBracketDefaultPositionType,
  GroupBracketDefaultType,
  Rounds,
} from "@pickem/shared";
import { Heading } from "~/components/ui/Heading";
import { Text } from "~/components/ui/Text";
import { TEAMS_INFO } from "~/constants";
import { GroupCard } from "./GroupCard";

type Props = {
  stage: Rounds;
  userPickem?: GroupBracketDefaultType;
  handleRemove: (stage: Rounds, name: any, id: number) => void;
  title: string;
  subtitle?: string;
  allowedDrop: number[];
  currDragElem?: number;
  stageEnd: boolean;
  correctAnswers: any;
};

export const CardRow = ({
  stage,
  userPickem,
  handleRemove,
  title,
  subtitle,
  allowedDrop,
  currDragElem,
  stageEnd,
  correctAnswers,
}: Props) => {
  const disabled =
    currDragElem !== undefined && !allowedDrop.includes(currDragElem);

  return (
    <>
      <Heading className="mb-1 text-center text-[28px]">{title}</Heading>
      {subtitle ? (
        <Text className="text-grey mb-4 text-center">{subtitle}</Text>
      ) : null}

      <div className="flex justify-around gap-4">
        {Object.keys(userPickem?.[stage] || {}).map((item, idx) => {
          const typedItem = item as keyof GroupBracketDefaultPositionType;

          const selected = userPickem?.[stage]?.[typedItem];

          const isAnswerCorrect = correctAnswers?.[stage]?.includes(selected!);

          return (
            <GroupCard
              stageDisabled
              size="xl"
              stageEnd={stageEnd}
              isAnswerCorrect={correctAnswers && isAnswerCorrect}
              selected={!!selected}
              handleRemove={() => handleRemove(stage, null, idx)}
              stage={stage}
              img={TEAMS_INFO[selected || 0]?.icon}
              disabled={disabled}
              position={item}
              showResult={!!correctAnswers && stageEnd}
              isNowDrag={false}
            />
          );
        })}
      </div>
    </>
  );
};
