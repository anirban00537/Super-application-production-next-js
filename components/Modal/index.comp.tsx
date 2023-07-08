"use client";

import { Modal } from "flowbite-react";
import { useState, Dispatch, SetStateAction, ReactNode } from "react";
export default function ModalElement({
  children,
  buttonTitle,
  openModal,
  setOpenModal,
}: {
  buttonTitle: string;
  openModal: string | undefined;
  setOpenModal: Dispatch<SetStateAction<string | undefined>>;
  children: ReactNode;
}) {
  const props = { openModal, setOpenModal };

  return (
    <>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => props.setOpenModal("form-elements")}
      >
        {buttonTitle}
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}
