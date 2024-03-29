import copy from "copy-to-clipboard";
import { PropsWithChildren } from "react";
import type { Props as ModalProps } from "react-modal";
import { CopyIcon } from "~/images/icons";
import { callToast } from "~/utils/toast";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { BaseModal } from "./BaseModal";

type Props = {
  handleCloseModal: () => void;
  promocode: string;
  titlePromocode: string;
} & ModalProps;

export const FreebetModal = ({
  isOpen,
  handleCloseModal,
  promocode,
  titlePromocode,
}: PropsWithChildren<Props>) => {
  const handleCopyClick = () => {
    copy(promocode);
    callToast("Промокод скопирован!");
  };

  return (
    <BaseModal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      customClassName="!h-auto sm:!w-[700px] text-center"
      closeIcon={false}
    >
      <div className="mb-6 inline-flex h-14 items-center justify-center rounded-2xl bg-white px-6 py-4">
        <Text className="text-2xl font-bold text-black">{promocode}</Text>
        <CopyIcon
          className="ml-2 cursor-pointer"
          onClick={() => handleCopyClick()}
        />
      </div>
      <Heading className="text-[28px]">{titlePromocode}</Heading>
      <Text className="mb-6 text-xl">
        Применить промокод можно на сайте в разделе <br /> «Бонусы и промокоды»
      </Text>
      <div className="flex justify-center gap-6">
        <Button type="grey" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button onClick={() => window.open("", "_blank")}>Забрать приз</Button>
      </div>
    </BaseModal>
  );
};
