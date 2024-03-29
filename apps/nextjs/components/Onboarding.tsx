"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import onboarding1Img from "~/images/arts/onboarding1.png";
import { LogoIcon } from "~/images/icons";
import { Button } from "./ui/Button";
import { Heading } from "./ui/Heading";
import { Text } from "./ui/Text";

export const Onboarding = () => {
  const t = useTranslations();
  const session = useGetSession();
  const router = useRouter();

  const [step, setStep] = useState(1);

  const { mutateAsync } = trpc.profile.updateProfileInfo.useMutation();

  const infoByStep = {
    1: {
      img: onboarding1Img,
      title: t("onboarding.step1_title"),
      subtitle: t("onboarding.step1_text"),
    },
    2: {
      img: onboarding1Img,
      title: t("onboarding.step2_title"),
      subtitle: t("onboarding.step2_text"),
    },
    3: {
      img: onboarding1Img,
      title: t("onboarding.step3_title"),
      subtitle: t("onboarding.step3_text"),
    },
  };

  const endOnboarding = async () => {
    await mutateAsync({
      data: { key: "view_onboarding", value: true },
    });

    router.refresh();
  };

  return (
    <div className="bg-black py-10">
      <div className="m-auto max-w-[1300px]">
        <div className="mb-10 flex">
          <LogoIcon height={48} width={150} />
        </div>
        <div className="bg-bgMain mx-auto max-w-[884px] rounded-2xl pb-10 text-center">
          <Image
            src={infoByStep[step as keyof typeof infoByStep].img}
            alt=""
            className="mb-10"
          />

          <div className="flex-center mb-8 gap-2">
            <div
              className={cn("bg-darkGrey h-1 w-6 rounded-sm", {
                ["bg-grey"]: step === 1,
              })}
            />
            <div
              className={cn("bg-darkGrey h-1 w-6 rounded-sm", {
                ["bg-grey"]: step === 2,
              })}
            />
            <div
              className={cn("bg-darkGrey h-1 w-6 rounded-sm", {
                ["bg-grey"]: step === 3,
              })}
            />
          </div>
          <Heading className="mb-2 text-[28px]">
            {infoByStep[step as keyof typeof infoByStep].title}
          </Heading>
          <Text className="mb-8 ml-auto mr-auto max-w-[360px] text-xl">
            {infoByStep[step as keyof typeof infoByStep].subtitle}
          </Text>
          <div className="flex items-center justify-center gap-6">
            <Button type="grey" onClick={() => endOnboarding()}>
              {t("onboarding.btn_skip")}
            </Button>
            <Button
              onClick={() =>
                step === 3 ? endOnboarding() : setStep((prev) => prev + 1)
              }
            >
              {t("onboarding.btn_next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
