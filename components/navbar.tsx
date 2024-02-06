"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "@/interfaces/user";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { BarChart3, LogOut } from "lucide-react";
import { StatsModal } from "./modals/stats-modal";
interface Props {
  dataUser: User;
}

const Navbar = ({ dataUser }: Props) => {
  const { logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState<boolean>(false);

  return (
    <>
      <AlertModal
        title="¿Estás seguro de cerrar sesion?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={logOut}
        loading={loading}
      />

      <StatsModal
        title="Estadisticas"
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        id={dataUser.user_id}
      />

      <div className="flex justify-between p-3 items-center shadow-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl">App Prestamos</h1>
        <Popover>
          <PopoverTrigger>
            <div className="flex justify-between gap-2 items-center md:hidden">
              <h3>{dataUser?.name}</h3>
              <Image
                width={50}
                height={50}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={dataUser.picture}
                alt="user"
                // onClick={() => setOpen(true)}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col">
            <button
              onClick={() => setShowStats(true)}
              className={`flex items-center p-2 text-gray-900 rounded-lg`}
            >
              <BarChart3 className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Estadisticas
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <LogOut className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Cerrar sesión
              </span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default Navbar;
