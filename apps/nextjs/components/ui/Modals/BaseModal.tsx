"use client";

import cn from "classnames";
import { PropsWithChildren } from "react";
import type { Props as ModalProps } from "react-modal";
import Modal from "react-modal";
import { CloseIcon } from "~/images/icons/CloseIcon";
import { Heading } from "../Heading";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    // maxHeight: "calc(100% - 50px)",
    height: "100%",
  },
};

type Props = {
  handleCloseModal: () => void;
  customClassName?: string;
  title?: string;
  closeIcon?: boolean;
} & ModalProps;

export const BaseModal = ({
  isOpen,
  onAfterOpen,
  handleCloseModal,
  children,
  customClassName,
  title,
  closeIcon = true,
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      ariaHideApp={false}
      // bodyOpenClassName={"test"}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick
      overlayClassName="bg-black bg-opacity-80 fixed inset-0 z-10"
      className={cn(
        "bg-bgMain absolute flex max-h-full w-full max-w-[964px] flex-col overflow-hidden rounded-2xl px-4 py-5 sm:max-h-[calc(100%-50px)] sm:p-10",
        customClassName,
      )}
    >
      {closeIcon && (
        <CloseIcon
          onClick={handleCloseModal}
          className="sm:fill-darkGrey absolute right-[30px] top-[30px] cursor-pointer fill-white"
        />
      )}

      {title && <Heading className="mb-6 text-2xl">{title}</Heading>}

      {/* <Scrollbars
        // noDefaultStyles
        // translateContentSizesToHolder
        // disableTracksWidthCompensation
        style={{ maxHeight: 300 }}
      >
        <div>{children}</div>
      </Scrollbars> */}
      <div className="h-full overflow-hidden">{children}</div>
    </Modal>
  );
};
