"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import { Button, Heading, Input, Text } from "~/components";
import { steamLinkPattern } from "~/constants";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import {
  CheckIconBorder,
  NotificationIcon,
  SteamSquareIcon,
  TelegramIconLine,
  TelegramSquareIcon,
} from "~/images/icons";
import runOneSignal from "~/utils/initOneSignal";
import { callToast } from "~/utils/toast";

export default function ProfilePage() {
  const session = useGetSession();
  const t = useTranslations();

  const [inputValue, setInputValue] = useState("");
  const [webNotifStatus, setWebNotifStatus] = useState<
    "default" | "denied" | "granted"
  >("default");

  const [isValid, setIsValid] = useState(true);

  const handleChangeInput = (val: string) => {
    setInputValue(val);
  };

  const { mutateAsync } = trpc.profile.updateProfileInfo.useMutation();
  const { mutateAsync: updateTelegramId } =
    trpc.profile.updateTelegramId.useMutation();

  useEffect(() => {
    runOneSignal().then(() => updateWebNotifStatus());
  }, []);

  useEffect(() => {
    if (window && window.location.hash) {
      updateTelegramId({
        hash: window.location.hash,
      });
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  const { mutate: updateInfoMutate, isLoading: updateInfoLoading } =
    trpc.profile.updateProfileInfo.useMutation();

  const handleClickSave = () => {
    if (!session.data?.userId || !isValid) return false;

    updateInfoMutate({
      data: { key: "steam_trade_link", value: inputValue },
    });

    callToast(t("toasts.saveProfile"));
  };

  const updateWebNotifStatus = () => {
    setWebNotifStatus(Notification?.permission);
  };

  const handleClickWebNotif = async () => {
    window.OneSignalDeferred.push(function () {
      if (!OneSignal.Notifications.permission) {
        OneSignal.Notifications.requestPermission().then(() => {
          const idUserWebNotif = OneSignal.User.PushSubscription.id;
          if (session.data?.userId) {
            mutateAsync({
              data: {
                key: "web_notif_id",
                value: idUserWebNotif,
              },
            });
          }
          updateWebNotifStatus();
        });
      }
    });
  };

  const connectTelegram = () => {
    if (session.data?.hasTelegram) return false;

    window.open(
      `https://oauth.telegram.org/auth?bot_id=6755858133&origin=https://pickem.io/profile&request_access=write`, //TODO: move to const
      "_self",
    );
  };

  const text_web_by_status = {
    denied: t("profile.webNotificationBlocked"),
    granted: t("profile.webNotificationGranted"),
    default: t("profile.webNotificationDefault"),
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 sm:flex-nowrap">
        <div className="bg-bgSecond mb-4 flex-grow rounded-2xl p-4 text-center sm:p-8 sm:text-left">
          <Heading className="mb-4 text-xl font-bold sm:text-2xl">
            {t("profile.addSteamUrlTitle")}
          </Heading>
          <div className="mb-2 flex flex-wrap items-start gap-2 sm:flex-nowrap">
            <Input
              pattern={steamLinkPattern}
              errorText={t("profile.addSteamUrlInputError")}
              validCb={(val) => setIsValid(val)}
              onChange={handleChangeInput}
              value={inputValue}
              wrapperClassName="w-full"
              placeholder={t("profile.addSteamUrlInputPlaceholder")}
            />
            <Text className="text-grey mb-4 text-xs sm:hidden">
              {t("profile.addSteamUrlInputDesc")}{" "}
              <a
                href="https://steamcommunity.com/profiles/76561198073581600/tradeoffers/privacy#trade_offer_access_url"
                target="_blank"
                className="text-blueMain cur"
              >
                {t("profile.addSteamUrlInputLink")}
              </a>
            </Text>
            <Button
              disabled={!isValid || !inputValue.length}
              size="md"
              type="primary"
              onClick={handleClickSave}
              isLoading={updateInfoLoading}
              className="sm:max-w-auto mx-auto w-full max-w-[248px] sm:w-auto"
            >
              {t("system.save")}
            </Button>
          </div>
          <Text className="text-grey hidden text-sm sm:block">
            {t("profile.addSteamUrlInputDesc")}{" "}
            <a
              href="https://steamcommunity.com/profiles/76561198073581600/tradeoffers/privacy#trade_offer_access_url"
              target="_blank"
              className="text-blueMain cur hover:underline"
            >
              {t("profile.addSteamUrlInputLink")}
            </a>
          </Text>
        </div>
        <div className="bg-bgSecond mb-4  rounded-2xl p-4 text-center  sm:p-8 sm:text-left">
          <Heading className="mb-4 whitespace-nowrap text-xl font-bold sm:text-2xl">
            {t("profile.socialsTitle")}
          </Heading>
          <div className="flex items-center gap-4">
            <div className="relative">
              <CheckIconBorder className="absolute -right-1 -top-1" />
              <SteamSquareIcon height={48} width={48} />
            </div>
            <div className="relative cursor-pointer" onClick={connectTelegram}>
              {session.data?.hasTelegram && (
                <CheckIconBorder className="absolute -right-1 -top-1" />
              )}
              <TelegramSquareIcon height={48} width={48} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bgSecond mb-4 inline-block rounded-2xl p-4 text-center sm:p-8 sm:text-left">
        <Heading className="mb-4 text-2xl">
          {t("profile.settingsTitle")}
        </Heading>

        <div className="flex flex-wrap gap-3">
          <div
            className="bg-bgMain flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3"
            onClick={() => handleClickWebNotif()}
          >
            <div className="flex-center h-10 w-10 rounded-lg">
              <NotificationIcon height={35} width={35} />
            </div>
            <div>
              <Text className="text-xl font-bold">
                {t("profile.settingsNotification")}
              </Text>
              <Text className="text-grey text-xs">
                {text_web_by_status[webNotifStatus]}
              </Text>
            </div>
          </div>
          <div
            className="bg-bgMain flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3"
            onClick={connectTelegram}
          >
            <div className="flex-center h-10 w-10 rounded-lg">
              <TelegramIconLine height={40} width={40} />
            </div>
            <div>
              <Text className="text-xl font-bold">Telegram</Text>
              <Text className="text-grey text-xs">
                {t("profile.settingsTelegramStatusNotOk")}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
