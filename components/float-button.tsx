"use client";
import useLoans from "@/hooks/useLoans";
import useNotifications from "@/hooks/useNotifications";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  id: string;
}

const FloatButton = ({ id }: Props) => {
  const { onToggle, saveId } = useLoans();
  const { show} = useNotifications()

  return (
    <div
      className={`
      fixed
      z-90
      right-8
      ${show ?'bottom-32':'bottom-24'}
      ${show ? 'md:bottom-14':'md:bottom-6'}    
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
      transition-all
      ease-out
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
