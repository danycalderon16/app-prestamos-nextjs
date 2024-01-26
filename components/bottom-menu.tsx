import React from "react";

import Link from "next/link";
import { CheckCircle, CircleDollarSign, DollarSign, Trash } from "lucide-react";
export const BottomMenu = () => {
  return (
    <div className={`fixed
    bottom-0
    left-0
    w-full
    z-50
    h-16
    bg-white
    border-t
    border-gray-200
    dark:bg-gray-700
    dark:border-gray-600
    sm:hidden`}>
      <ul className="font-medium flex gap-5 justify-center">
        <li>
          <Link
            href="/loans"
            className="flex items-center p-2 flex-col text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <CircleDollarSign className="text-gray-500" size={30}/>
            <span className="flex-1 whitespace-nowrap">Prestamos</span>
          </Link>
        </li>
        <li>
          <Link
            href="/completed"
            className="flex items-center p-2 flex-col text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <CheckCircle className="text-gray-500" size={30}/>
            <span className="flex-1 whitespace-nowrap">Completados</span>
          </Link>
        </li>
        <li>
          <Link
            href="/deletes"
            className="flex items-center p-2 flex-col text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <Trash className="text-gray-500" size={30}/>
            <span className="flex-1 whitespace-nowrap">Eliminados</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
