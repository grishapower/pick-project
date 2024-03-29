"use client";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Collapse } from "react-collapse";

import { Heading, Text } from "~/components";
import { SelectArrowIcon } from "~/images/icons";

export default function ProfilePage() {
  const t = useTranslations();
  const [showNominationsCount, setShowNominationsCount] = useState(false);
  const [showGroupCount, setShowGroupCount] = useState(false);
  const [showPlayoffCount, setShowPlayoffCount] = useState(false);

  return (
    <div>
      <Heading className="mb-6 text-4xl font-bold">{t("faq.faqTitle")}</Heading>
      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_1_title")}
      </Heading>
      <Text className="text-grey mb-4 text-lg">{t("faq.faq_1_text")}</Text>

      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_2_title")}
      </Heading>

      <Text className="text-grey mb-4 text-lg">
        {t("faq.faq_2_text_one")} <br />
        {t("faq.faq_2_text_two")} <br />
        {t("faq.faq_2_text_three")} <br />
      </Text>

      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_3_title")}
      </Heading>
      <Text className="text-grey mb-2 text-lg">{t("faq.faq_3_text")}</Text>

      <Text
        className=" text-grey mb-2 flex cursor-pointer items-center gap-2 text-lg"
        onClick={() => setShowNominationsCount((prev) => !prev)}
      >
        {t("faq.faq_3_spolier_one")}

        <SelectArrowIcon
          className={cn("transition-all", {
            ["rotate-180"]: showNominationsCount,
          })}
        />
      </Text>
      <Collapse isOpened={showNominationsCount}>
        <div className="mb-2 ml-2">
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_1")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_2")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_3")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_4")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_5")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_6")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_7")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_8")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_9")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_10")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_11")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_12")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_12")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_13")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_14")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_one_inner_15")}
          </div>
        </div>
      </Collapse>
      <Text
        className=" text-grey mb-2 flex cursor-pointer items-center gap-2 text-lg"
        onClick={() => setShowGroupCount((prev) => !prev)}
      >
        {t("faq.faq_3_spolier_second")}
        <SelectArrowIcon
          className={cn("transition-all", {
            ["rotate-180"]: showGroupCount,
          })}
        />
      </Text>
      <Collapse isOpened={showGroupCount}>
        <div className="mb-2 ml-2">
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_second_inner_1")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_second_inner_2")}
          </div>
        </div>
      </Collapse>

      <Text
        className=" text-grey mb-2 flex cursor-pointer items-center gap-2 text-lg"
        onClick={() => setShowPlayoffCount((prev) => !prev)}
      >
        {t("faq.faq_3_spolier_third")}
        <SelectArrowIcon
          className={cn("transition-all", {
            ["rotate-180"]: showPlayoffCount,
          })}
        />
      </Text>
      <Collapse isOpened={showPlayoffCount}>
        <div className="mb-2 ml-2">
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_third_inner_1")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_third_inner_2")}
          </div>
          <div className="text-grey mb-1">
            {t("faq.faq_3_spolier_third_inner_3")}
          </div>
        </div>
      </Collapse>

      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_4_title")}
      </Heading>
      <Text className="text-grey mb-4 text-lg">{t("faq.faq_4_text")}</Text>

      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_5_title")}
      </Heading>
      <Text className="text-grey mb-4 text-lg">{t("faq.faq_5_text")}</Text>

      <Heading className="mb-2 text-2xl font-bold">
        {t("faq.faq_6_title")}
      </Heading>
      <Text className="text-grey mb-4 text-lg">{t("faq.faq_6_text")}</Text>
    </div>
  );
}
