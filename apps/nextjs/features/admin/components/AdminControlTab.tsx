"use client";

import { useParams } from "next/navigation";
import { Heading } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";

export const AdminControlTab = () => {
  const params = useParams();
  const tournamentId = params!.id as string;
  const session = useGetSession();

  //query
  const { data: tournamentData } = trpc.tournaments.getTournamentById.useQuery({
    tournamentId,
  });

  //mutate
  const { mutate: resetMutate } = trpc.admin.resetPickem.useMutation();

  const { mutate: startBeforeTournamentMutate } =
    trpc.admin.startBeforeTournament.useMutation();
  const { mutate: startLastQualMutate } =
    trpc.admin.startLastQualStage.useMutation();
  const { mutate: startGroupStage } = trpc.admin.startGroupStage.useMutation();
  const { mutate: endGroupMutate } = trpc.admin.endGroupStage.useMutation();
  const { mutate: startPlayoffMutate } =
    trpc.admin.startPlayoffStage.useMutation();
  const { mutate: endPlayoffStagePlayoffMutate } =
    trpc.admin.endPlayoffStage.useMutation();

  const { mutate: inserRightAnswersPickemMutate, data } =
    trpc.admin.inserRightAnswersPickem.useMutation();
  const { mutate: updateParticipantsMedalMutate } =
    trpc.admin.updateParticipantsMedal.useMutation();

  const {
    mutate: addTestUsers,
    // isLoading: ,
  } = trpc.admin.addTestUserPickem.useMutation();

  const {
    mutate: removeTestUserPickem,
    // isLoading: ,
  } = trpc.admin.removeTestUserPickem.useMutation();

  return (
    <div>
      <div className="mb-4">
        <div className="text mb-3">
          <Heading className="text-xl">Управление</Heading>
          <div className="mb-5 flex flex-wrap gap-8">
            <button
              className="border p-2"
              onClick={() => startBeforeTournamentMutate({ tournamentId })}
            >
              Пред турнирный
            </button>

            <button
              className="border p-2"
              onClick={() => startLastQualMutate({ tournamentId })}
            >
              Начать последний отбор (груповую стадию)
            </button>
            <button
              className="border p-2"
              onClick={() => startGroupStage({ tournamentId })}
            >
              Начать сам турнир (груповую стадию)
            </button>
            <button
              className="border p-2"
              onClick={() => endGroupMutate({ tournamentId })}
            >
              закончить груповую стадию
            </button>
            <button
              className="border p-2"
              onClick={() => startPlayoffMutate({ tournamentId })}
            >
              Начать плейофф стадию
            </button>
            <button
              className="border p-2"
              onClick={() => endPlayoffStagePlayoffMutate({ tournamentId })}
            >
              Закончить плейофф стадию и турнир
            </button>
            <button
              className="ml-3 border-l-2"
              onClick={() =>
                resetMutate({
                  userId: session.data?.userId!,
                  tournamentId,
                })
              }
            >
              Удалить пикем (свой)
            </button>
          </div>
          <div className="flex gap-8">
            <button onClick={() => addTestUsers({ tournamentId })}>
              Добавить Тестовых юзеров в пикем
            </button>
            <button onClick={() => removeTestUserPickem({ tournamentId })}>
              Удалить Тестовых юзеров из пикема
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className="cursor-pointer border p-2"
            onClick={() =>
              inserRightAnswersPickemMutate({ tournamentId, type: 1 })
            }
          >
            Вставить ответы на последний отбор
          </div>
          <div
            className="cursor-pointer border p-2"
            onClick={() =>
              inserRightAnswersPickemMutate({
                tournamentId,
                type: 2,
              })
            }
          >
            Вставить ответы на номинации
          </div>

          <div
            className="cursor-pointer border p-2"
            onClick={() =>
              inserRightAnswersPickemMutate({ tournamentId, type: 3 })
            }
          >
            Вставить ответы на основную группу
          </div>
          <div
            className="cursor-pointer border p-2"
            onClick={() =>
              inserRightAnswersPickemMutate({ tournamentId, type: 4 })
            }
          >
            Вставить ответы на плейофф
          </div>
          <div
            className="cursor-pointer border p-2"
            onClick={() => inserRightAnswersPickemMutate({ tournamentId })}
          >
            Удалить все ответы
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div
          className="cursor-pointer border p-2"
          onClick={() => updateParticipantsMedalMutate({ tournamentId })}
        >
          Апгрейднуть всем медальку
        </div>
      </div>
    </div>
  );
};
