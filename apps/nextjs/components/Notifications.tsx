"use client";

import cn from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import { NotificationIcon } from "~/images/icons";
import { CloseIcon } from "~/images/icons/CloseIcon";
import { CustomScrollbar } from "./CustomScrollbar";
import { Text } from "./ui/Text";

export const Notifications = () => {
  const t = useTranslations();
  const locale = useLocale();
  const session = useGetSession();

  const [isOpen, setOpen] = useState(false);
  const [archiveMode, setArchiveMode] = useState(false);

  const { data: notificationsList } =
    trpc.notification.getUserNotifications.useQuery(
      { locale },
      { enabled: Boolean(session.data?.userId) },
    );

  const newNotifications = (notificationsList || []).filter(
    (i) => !i.isRead,
  ).length;

  const { mutate: readAllNotifMutate } =
    trpc.notification.readAllNotifications.useMutation();

  const { mutate: archiveNotificationMutate } =
    trpc.notification.archiveNotifications.useMutation();

  const readAllNotif = () => {
    readAllNotifMutate();
  };

  const archiveNotif = (idNotif: string) => {
    archiveNotificationMutate({
      idNotif: [idNotif],
    });
  };

  const handleRemoveAllNotif = () => {
    if (!archiveMode) {
      archiveNotificationMutate({
        idNotif: (notificationsList || [])?.map((i) => i.id),
      });
    }
  };

  const renderNotificationsList = useMemo(() => {
    return notificationsList?.filter((i) =>
      archiveMode ? i.archive : !i.archive,
    );
  }, [archiveMode, notificationsList]);

  const emptyNotification = !renderNotificationsList?.length;

  return (
    <div>
      <a
        className={
          "bg-bgSecond relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg"
        }
        data-tooltip-id="notif-tooltip"
      >
        <NotificationIcon className={cn({ ["fill-blueMain"]: isOpen })} />
        {newNotifications > 0 ? (
          <div className="bg-red flex-center absolute right-[8px] top-[8px] h-[14px] w-4 rounded-full text-[8px]">
            +{newNotifications}
          </div>
        ) : null}
      </a>

      <Tooltip
        id="notif-tooltip"
        openOnClick
        place="bottom"
        className="bg-bgSecond z-10 w-[300px] rounded-2xl p-4 shadow-[0px_4px_10px_0px_#00000040]"
        afterShow={() => setOpen(true)}
        afterHide={() => {
          setOpen(false);
          readAllNotif();
        }}
        opacity={100}
        noArrow
        disableStyleInjection
        clickable
      >
        <div className="flex justify-between">
          <Text className="mb-2 text-base font-bold">
            {archiveMode
              ? t("notifications.archive")
              : t("notifications.mainTitle")}
          </Text>
          <Text
            className="text-blueMain inline-block cursor-pointer"
            onClick={() => setArchiveMode((prev) => !prev)}
          >
            {archiveMode ? t("notifications.back") : t("notifications.archive")}
          </Text>
        </div>
        {emptyNotification && (
          <Text className="text-grey py-2">
            {archiveMode
              ? t("notifications.archiveEmpty")
              : t("notifications.notificationEmpty")}
          </Text>
        )}
        <CustomScrollbar scrollbar={{ autoHeight: true }}>
          {!emptyNotification ? (
            <>
              <div className="mb-4 flex max-h-[200px] flex-col gap-2">
                {renderNotificationsList?.map((item) => {
                  return (
                    <div
                      key={item.title}
                      className={cn("bg-bgMain relative rounded-lg px-4 py-3", {
                        ["border-lightBlue border-l-[3px]"]: !item.isRead,
                      })}
                    >
                      <Text
                        className={cn("font-bold", {
                          ["text-grey"]: item.isRead,
                        })}
                      >
                        {item.title}
                      </Text>
                      <Text
                        className={cn({
                          ["text-grey"]: item.isRead,
                        })}
                      >
                        {item.text}
                      </Text>
                      <CloseIcon
                        onClick={() => archiveNotif(item.id)}
                        className="fill-darkGrey absolute right-2 top-2 cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </CustomScrollbar>

        {!emptyNotification && !archiveMode && (
          <Text
            className="text-blueMain inline-block cursor-pointer"
            onClick={handleRemoveAllNotif}
          >
            {t("notifications.clearAll")}
          </Text>
        )}
      </Tooltip>
    </div>
  );
};
