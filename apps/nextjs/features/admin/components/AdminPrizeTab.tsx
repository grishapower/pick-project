import { Prize } from "@pickem/shared";
import cn from "classnames";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button, Text } from "~/components";
import { SKINS_LIST } from "~/constants/skins-list";
import { trpc } from "~/contexts/TRPCProvider";

const DEFAULT_PRIZE = {
  img: "*.jpg",
  name: "",
  type: "SKIN",
  winPositionStart: 0,
  winPositionEnd: null,
  prizeId: 0,
} as Prize;

const DEFAULT_SEND_PRIZE = {
  type: "SKIN",
  freebet_code: "",
  skin_id: null,
  name: "",
} as any;

export const AdminPrizeTab = () => {
  const params = useParams();
  const tournamentId = params!.id as string;

  const [lang, setLang] = useState<"RU" | "EN">("RU");

  const [newPrizeInfo, setNewPrizeInfo] = useState<Prize>(DEFAULT_PRIZE);

  const [sendPrize, setSendPrize] = useState<{
    type: "SKIN" | "FREEBET";
    freebet_code?: string;
    skin_id?: number | null;
    name?: string;
  }>(DEFAULT_SEND_PRIZE);

  const { data: prizesData } = trpc.prizes.getSkinPrizesByTournamentId.useQuery(
    { tournamentId, region: lang },
  );

  const {
    mutate: addPrizeByTournamentDB,
    isLoading: loadingAddPrizeByTournamentDB,
  } = trpc.admin.addPrizeSkinTournament.useMutation();

  const { mutate: removePrizeSkinTournament } =
    trpc.admin.removePrizeSkinTournament.useMutation();

  const { mutate: sendPrizeToUserMutate, isLoading: sendPrizesLoading } =
    trpc.admin.sendPrizeToUser.useMutation();

  const { data: getLeaderboardUsersData } =
    trpc.admin.getLeaderboardUsers.useQuery({ tournamentId });

  const handleUpdatePrizeDB = () => {
    addPrizeByTournamentDB({ tournamentId, data: newPrizeInfo, region: lang });
  };

  const sendPrizeToUse = (userId: string) => {
    sendPrizeToUserMutate({
      tournamentId: tournamentId,
      userId,
      data: sendPrize,
    });

    setSendPrize(DEFAULT_SEND_PRIZE);
  };

  return (
    <>
      <div className="mb-8">
        <div className="mb-5 flex items-center">
          <Text className="mb-3 text-xl">Призы за турнир:</Text>
          <div className="ml-5 flex gap-3">
            <div
              className={cn("cursor-pointer border p-2", {
                ["bg-lighBlue2"]: lang === "RU",
              })}
              onClick={() => setLang("RU")}
            >
              RU
            </div>
            <div
              className={cn("cursor-pointer border p-2", {
                ["bg-lighBlue2"]: lang === "EN",
              })}
              onClick={() => setLang("EN")}
            >
              EN
            </div>
          </div>
        </div>

        <div className="mb-5 flex">
          {prizesData?.map((i, idx) => {
            return (
              <div className="border-r-2 p-3" key={i.name}>
                <img
                  // src={getPrizeImgPath(i.img, i.type === "SKIN")}
                  // src={`${getBaseUrl()}/assets/${i.prizeImg} `}
                  alt=""
                  width={100}
                  height={100}
                />
                <div>PrizeName: {i.name}</div>
                <div>
                  PrizePosition : {i.winPositionStart} - {i.winPositionEnd}
                </div>
                <div>PrizeId : {i.prizeId}</div>

                <button
                  onClick={() => {
                    removePrizeSkinTournament({
                      prizeId: i.prizeId,
                      tournamentId,
                    });
                  }}
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </div>
        <Button
          onClick={handleUpdatePrizeDB}
          isLoading={loadingAddPrizeByTournamentDB}
        >
          Обновить призы стадии
        </Button>
        <div className="inline-block border p-2">
          <Text>Добавить новый приз</Text>
          <div className="mb-2">
            <Text>IMG STRING</Text>
            <input
              className="text-black"
              placeholder="ID PRIZE"
              value={newPrizeInfo.img}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({ ...prev, img: target.value }))
              }
            />
          </div>
          <div className="mb-2">
            <Text>NAME STRING</Text>
            <input
              className="text-black"
              placeholder="ID PRIZE"
              value={newPrizeInfo.name}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({ ...prev, name: target.value }))
              }
            />
          </div>
          <div className="mb-2">
            <Text>START_POS NUMBER</Text>
            <input
              className="text-black"
              placeholder="ID PRIZE"
              value={newPrizeInfo.winPositionStart}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({
                  ...prev,
                  winPositionStart: +target.value,
                }))
              }
            />
          </div>
          <div className="mb-2">
            <Text>END_POS NUMBER</Text>
            <input
              className="text-black"
              placeholder="ID PRIZE"
              value={newPrizeInfo?.winPositionEnd || undefined}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({
                  ...prev,
                  winPositionEnd: +target.value,
                }))
              }
            />
          </div>

          <div className="mb-2">
            <Text>PRIZE_ID NUMBER</Text>
            <input
              className="text-black"
              placeholder="ID PRIZE"
              value={newPrizeInfo?.prizeId}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({ ...prev, prizeId: +target.value }))
              }
            />
          </div>

          <div className="mb-4 ">
            <Text>TYPE</Text>

            <select
              className="text-black"
              value={newPrizeInfo.type}
              onChange={({ target }) =>
                setNewPrizeInfo((prev) => ({
                  ...prev,
                  type: target.value as "SKIN" | "FREEBET",
                }))
              }
            >
              <option>SKIN</option>
              <option>FREEBET</option>
            </select>
          </div>

          <Button
            onClick={() => {
              // setPrizeInfo((prev) => [...prev, newPrizeInfo]);
              handleUpdatePrizeDB();
              setNewPrizeInfo(DEFAULT_PRIZE);
            }}
          >
            Добавить новый приз
          </Button>
        </div>
      </div>

      <div>
        <Text className="mb-4 text-2xl">Выдача призов</Text>
        {getLeaderboardUsersData &&
          getLeaderboardUsersData.map((item) => {
            return (
              <div className="flex gap-3 border-b-2 pb-2">
                <div>
                  <Text className="text-lg">Ник: {item.nickname}</Text>
                  <Text className="text-lg">Позиция: {item.position}</Text>
                  <Text className="text-lg">Очков: {item.points}</Text>
                  <Text className="text-lg">Id: {item.userId}</Text>
                </div>
                <div>
                  <div className="flex gap-5">
                    <div>
                      <div>
                        <Text>Freebet code</Text>
                        <input
                          className="text-black"
                          value={sendPrize.freebet_code}
                          onChange={({ target }) =>
                            setSendPrize((prev) => ({
                              ...prev,
                              freebet_code: target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Text>skin_id</Text>
                        <input
                          className="text-black"
                          value={sendPrize.skin_id || ""}
                          onChange={({ target }) =>
                            setSendPrize((prev) => ({
                              ...prev,
                              skin_id: +target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Text>name</Text>
                        <input
                          className="text-black"
                          value={sendPrize.name}
                          onChange={({ target }) =>
                            setSendPrize((prev) => ({
                              ...prev,
                              name: target.value,
                            }))
                          }
                        />
                      </div>
                      <select
                        className="text-black"
                        value={sendPrize.type}
                        onChange={({ target }) =>
                          setSendPrize((prev) => ({
                            ...prev,
                            type: target.value as "SKIN" | "FREEBET",
                          }))
                        }
                      >
                        <option>SKIN</option>
                        <option>FREEBET</option>
                      </select>
                    </div>
                    <img
                      className="h-[100px] w-[100px]"
                      src={
                        SKINS_LIST[sendPrize.skin_id as keyof typeof SKINS_LIST]
                          ?.img?.src
                      }
                      alt=""
                    />
                    <div>
                      {
                        SKINS_LIST[sendPrize.skin_id as keyof typeof SKINS_LIST]
                          ?.name
                      }
                    </div>
                  </div>

                  <Button
                    isLoading={sendPrizesLoading}
                    onClick={() => sendPrizeToUse(item.userId!)}
                  >
                    Выдать приз
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
