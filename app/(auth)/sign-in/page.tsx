"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  const data = useSession();

  if(data.status === "authenticated"){
    redirect("loans")
  }
  

  return (
    <div className="bg-white flex h-full">
      <div className="flex items-center justify-center h-screen w-screen dark:bg-gray-800 ">
        <button
        onClick={()=>signIn()}
          className={`px-4
                py-2
                border
                flex
                gap-2
                border-slate-200
                dark:border-slate-700
                rounded-lg
                text-slate-700
                dark:text-slate-200
                hover:border-slate-400
                dark:hover:border-slate-500
                hover:text-slate-900
                dark:hover:text-slate-300
                hover:shadow
                transition
                duration-150`}
        >
          <Image
            className="w-6 h-6"
            src={"/google_logo.svg"}
            loading="lazy"
            width={24}
            height={24}
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
