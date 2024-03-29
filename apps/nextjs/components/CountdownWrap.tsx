"use client";
import { useTranslations } from "next-intl";
import Countdown from "react-countdown";

type Props = {
  date?: string | number | Date | undefined;
  wrapperClassName?: string;
};
export const CountdownWrap = ({ date, wrapperClassName }: Props) => {
  const t = useTranslations();

  return (
    <Countdown
      date={date}
      renderer={(props) => {
        if (props.days) {
          return (
            <span className={wrapperClassName}>
              <span>
                {props.days}
                {t("countdownWrap.day")}
              </span>
              <span className="ml-1">
                {props.hours}
                {t("countdownWrap.hour")}
              </span>
            </span>
          );
        }

        return (
          <span className={wrapperClassName}>
            <span>
              {props.hours}
              {t("countdownWrap.hour")}
            </span>
            <span className="ml-1">
              {props.minutes}
              {t("countdownWrap.minute")}
            </span>
          </span>
        );
      }}
    />
  );
};
