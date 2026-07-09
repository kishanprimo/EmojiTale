"use client";

import Button from "./Button";
import { Info } from "lucide-react";

type InfoModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const InfoModal = ({
  open,
  title,
  message,
  onClose,
}: InfoModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <Info className="h-8 w-8 text-[#2563EB]" />
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-[#101828]">
            {title}
          </h2>

          <p className="mt-3 text-[15px] leading-6 text-[#667085]">
            {message}
          </p>

          <Button
            onClick={onClose}
            className="mt-8"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;