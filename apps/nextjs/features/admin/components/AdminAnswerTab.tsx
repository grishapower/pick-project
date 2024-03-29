import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Text } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

export const AdminAnswerTab = () => {
  const params = useParams();
  const tournamentId = params!.id as string;

  const [answersInfo, setAnswersInfo] = useState<any>({});

  const { data: answersData } = trpc.answers.getCorrectAnswers.useQuery({
    tournamentId,
  });
  const {
    mutate: addAnswersByTournamentDB,
    isLoading: loadingAddAnswersByTournamentDB,
  } = trpc.admin.updateAnswersTournament.useMutation();

  useEffect(() => {
    if (answersData) {
      setAnswersInfo(answersData);
    }
  }, [answersData]);

  return (
    <div className="mb-4">
      <Text className="mb-3 text-xl">Правильные ответы на пикем</Text>
      <div className="mb-5">
        <textarea
          className="w-[500px] text-black"
          value={JSON.stringify(answersInfo, undefined, 4)}
          onChange={({ target }) => setAnswersInfo(JSON.parse(target.value))}
        />
      </div>
      {/* <Text
        onClick={() => setAnswersInfo(JSON.stringify(correctAnswersExample))}
      >
        Вставить Заранее готовые
      </Text> */}
      <Button
        onClick={() =>
          addAnswersByTournamentDB({
            tournamentId,
            data: answersInfo,
          })
        }
        isLoading={loadingAddAnswersByTournamentDB}
      >
        Обновить ответы
      </Button>
    </div>
  );
};
