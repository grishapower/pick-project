"use client";

import { Button, FreebetModal, Heading, Skeleton, Text } from "~/components";

import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { SKINS_LIST } from "~/constants/skins-list";
import { trpc } from "~/contexts/TRPCProvider";
import { useGetSession } from "~/hooks/useGetSession";
import freebetPath from "~/images/arts/freebet_inventory.png";
import { EmptyInventory } from "~/images/icons/EmptyInventory";

export default function InventoryPage() {
  const session = useGetSession();
  const t = useTranslations();

  const [showModal, setShowModal] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [titlePromocode, setTitlePromocode] = useState("");

  const { data: dataInvetory, isLoading: inventoryLoading } =
    trpc.inventory.getInventory.useQuery();

  //TODO MUTATION
  const {} = trpc.inventory.readAllNewItems.useQuery();
  const { mutate: takeItem } = trpc.inventory.takeItem.useMutation();

  const handleTakeSkin = (itemId: number) => {
    takeItem({
      itemId: itemId,
    });
  };

  const handleTakePromocode = (
    itemId: number,
    promocode: string | null,
    title: string,
  ) => {
    if (!promocode) return;

    setShowModal(true);
    setPromocode(promocode);
    setTitlePromocode(title);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        {inventoryLoading && (
          <>
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
            <Skeleton className="h-[244px] w-[155px] sm:w-[184px]" />
          </>
        )}
        {!inventoryLoading && dataInvetory && !dataInvetory.length && (
          <div className="m-auto py-[80px] text-center">
            <EmptyInventory className="m-auto" />
            <Heading className="text-grey text-xl sm:text-2xl">
              {t("inventory.empty")}
            </Heading>
          </div>
        )}
        {!inventoryLoading &&
          dataInvetory &&
          dataInvetory
            .sort((a, b) => +a.used - +b.used)
            .map((item) => {
              const isFreebet = item.type === "FREEBET";

              const skin = SKINS_LIST[item.skin_id as keyof typeof SKINS_LIST];

              return (
                <div
                  key={item.id}
                  className={cn(
                    "bg-bgSecond border-bgSecond relative flex h-[218px] w-[155px] flex-col justify-between overflow-hidden rounded-xl border-2 pb-6 text-center sm:h-[248px] sm:w-[184px]",
                    {
                      ["hover:border-blueMain group cursor-pointer"]:
                        !item.used,
                      ["select-none"]: item.used,
                    },
                  )}
                >
                  <Image
                    src={isFreebet ? freebetPath : skin?.img}
                    width={isFreebet ? 80 : 120}
                    alt=""
                    className="m-auto"
                  />
                  <div>
                    <Text className="text-grey text-xs">
                      {isFreebet ? "Фрибет" : "Скин"}
                    </Text>
                    {isFreebet ? (
                      <Heading className={cn("text-xl sm:text-2xl")}>
                        {item.name}
                      </Heading>
                    ) : (
                      <Text className={cn("text-base")}>{skin?.name}</Text>
                    )}
                  </div>

                  <div
                    className={cn(
                      "bg-bgSecond absolute inset-0 bg-opacity-60",
                      {
                        ["opacity-0 transition-all group-hover:opacity-100"]:
                          !item.used,
                      },
                    )}
                  >
                    <Button
                      size="sm"
                      onClick={() =>
                        !item.used &&
                        (isFreebet
                          ? handleTakePromocode(
                              item.id,
                              item.freebet_code,
                              item.name || "",
                            )
                          : handleTakeSkin(item.id))
                      }
                      type={item.used ? "grey" : "primary"}
                      className="absolute left-[50%] top-[50%] w-[115px] -translate-x-1/2 -translate-y-1/2 sm:w-[152px]"
                    >
                      {item.used ? t("inventory.got") : t("inventory.take")}
                    </Button>
                  </div>
                </div>
              );
            })}

        <FreebetModal
          promocode={promocode}
          titlePromocode={titlePromocode}
          handleCloseModal={() => {
            setShowModal(false);
            setPromocode("");
            setTitlePromocode("");
          }}
          isOpen={showModal}
        />
      </div>
    </div>
  );
}
