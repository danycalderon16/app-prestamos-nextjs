"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import Link from "next/link";
import { CircleDollarSign, CheckCircle, Trash, LogOut, BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User } from "@/interfaces/user";
import { ROUTES } from "@/lib/routes";
import useLoans from "@/hooks/useLoans";
import { StatsModal } from "./modals/stats-modal";

interface Props {
  dataUser: User;
}

export const SideMenu = ({ dataUser }: Props) => {
  const { logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const {loans} = useLoans()
  // ROUTES[0].stats= loans;
  const pathName = usePathname();
  const [showStats, setShowStats]= useState<boolean>(false);

  return (
    <>
      <AlertModal
        title="¿Estás seguro de cerrar sesion?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => logOut()}
        loading={loading}
      />

      <StatsModal
        title="Estadisticas"
        isOpen={showStats}
        onClose={() => setShowStats(false)}        
        id={dataUser.user_id}
      />

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="h-full font-medium flex flex-col gap-y-3 ">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`flex items-center p-2 text-gray-900 rounded-lg  ${pathName===route.path ?'bg-slate-200 ':'hover:bg-slate-200'}`}
                >
                  <route.icon className="text-gray-500" size={30} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {route.name}
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {route.stats}
                  </span>
                </Link>
              </li>
            ))}
              <li>
                <button
                onClick={()=>setShowStats(true)}
                  className={`flex items-center p-2 text-gray-900 rounded-lg`}
                >
                  <BarChart3 className="text-gray-500" size={30} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Estadisticas
                  </span>
                </button>
              </li>

            <li className="mt-auto">
              <div>
                <div className="flex gap-3 items-center mb-3 pb-2 border-b border-slate-600">
                  {dataUser && (
                    <>
                      <Image
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                        src={dataUser.picture}
                        alt="user"
                      />
                      <p>{dataUser.name}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <LogOut className="text-gray-500" size={30} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
