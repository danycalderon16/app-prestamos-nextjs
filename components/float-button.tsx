"use client";
import { postLoan } from "@/actions/post-loan";
import loan from "@/app/(dashboard)/loans/components/loan";
import useLoans from "@/hooks/useLoans";
import { Loan } from "@/interfaces/loans";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  id: string;
}

const FloatButton = ({ id }: Props) => {
  const { onToggle, saveId } = useLoans();
  return (
    <div
      className={`
    fixed
    z-90
    bottom-24
    md:bottom-6
    right-8
    w-[50px]
    h-[50px]
    bg-sky-500
    rounded-full
    drop-shadow-lg
    flex
    justify-center
    items-center
    cursor-pointer
    hover:drop-shadow-2xl
    hover:bg-sky-600
    duratio-300
    `}
      onClick={() => {
        onToggle();
        saveId(id)
      }}
    >
      <Plus className="text-white" size={40} />
    </div>
  );
};

export default FloatButton;
