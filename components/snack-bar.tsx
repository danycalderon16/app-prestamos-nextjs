"use client";
import useNotifications from "@/hooks/useNotifications";
import Link from "next/link";
import React from "react";

function SnackBar() {
  const { show, message, type, action } = useNotifications();
  
  if (show) {
    return (
      <div
        className={`
          fixed
          bottom-20
          md:bottom-0
          left-0
          right-0
          md:left-[256px]
          md:-right-0
          h-16
          flex
          items-center 
          text-white  
          z-50          
          `}
      >
        <div className={`
        text-sm
        sm:text-base
        bg-gray-800
        w-full
        mr-5
        ml-5
        p-2
        pl-4
        pr-4
        rounded-md
        drop-shadow-lg
        flex
        justify-between`}>
          <span>{message}</span>
          {
            type === "error" ? (
              <span className="text-yellow-300">Inténtelo otra vez</span>
            ) : 
            action && (
              <>
                <Link className="text-yellow-300 underline" href={action.href}>{action.text}</Link>
              </>
            )
}
        </div>
      </div>
    );
  }

  return null;
}

export default SnackBar;
