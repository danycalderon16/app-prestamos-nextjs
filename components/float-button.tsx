"use client";
import useLoans from "@/hooks/useLoans";
import useNotifications from "@/hooks/useNotifications";
import usePayments from "@/hooks/usePayments";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  id: string;
}

const FloatButton = ({ id }: Props) => {
  const path = usePathname();

  const { onToggle: onToggleLoans, saveId } = useLoans();
  const { onToggle: onTogglePayments } = usePayments();
  const { show } = useNotifications();
  saveId(id);

  const onShowModals = () => {
    if (path === "/loans") {
      onToggleLoans();
    } else {      
      onTogglePayments();
    }
  };

  return (
    <div
      className={`
      ${!path.startsWith("/loans") && 'hidden'}
      fixed
      z-90
      right-8
      ${show ? "bottom-36" : "bottom-24"}
      ${show ? "md:bottom-14" : "md:bottom-6"}    
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
      onClick={() => onShowModals()}>
      <Plus className="text-white" size={40} />
    </div>
  );
};

export default FloatButton;
