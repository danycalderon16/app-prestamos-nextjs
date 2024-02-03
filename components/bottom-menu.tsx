"use client"
import React from "react";

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { usePathname } from "next/navigation";

const BottomMenu = () => {
  const pathName = usePathname();
  return (
    <div className={`fixed
    bottom-0
    left-0
    w-full
    z-50
    h-[5rem]
    bg-white
    shadow-top
    border-gray-200
    dark:bg-gray-700
    dark:border-gray-600
    md:hidden`}>
      <ul className="font-medium flex gap-5 m-[5px] justify-center">
        {
          ROUTES.map((route) => (
            <li key={route.path}>
          <Link
            href={route.path}
            className={`flex items-center p-2 flex-col text-gray-900 rounded-lg  hover:bg-gray-100 ${pathName=== route.path ? 'bg-slate-200':''}`}
          >
            <route.icon className="text-gray-500" size={30}/>
            <span className="flex-1 whitespace-nowrap">{route.name}</span>
          </Link>
        </li>
          ))
        }
       
      </ul>
    </div>
  );
};

export default BottomMenu;