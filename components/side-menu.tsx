"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import Link from "next/link";
import { useLoans } from "@/hooks/useLoans";
import { CircleDollarSign, CheckCircle, Trash, LogOut } from "lucide-react";

const SideMenu = () => {
  const { user, logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <AlertModal
        title="¿Estás seguro de cerrar sesion?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={logOut}
        loading={loading}
      />

    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="h-full font-medium flex flex-col gap-y-3">
         
          <li>
            <Link
              href="/loans"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <CircleDollarSign className="text-gray-500" size={30}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Prestamos</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/completed"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
             <CheckCircle className="text-gray-500" size={30}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Completados</span>
            </Link>
          </li>
          <li>
            <Link
              href="/deletes"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <Trash className="text-gray-500" size={30}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Eliminados</span>
            </Link>
          </li>
         
          <li className="mt-auto">
            <button
             onClick={() => setOpen(true)}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <LogOut className="text-gray-500" size={30}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
    </>
  );
};

export default SideMenu;
