"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BarChart3, HelpCircle, LogOut } from "lucide-react";
import { AlertModal, StatsModal, SupportModal } from "./modals";
interface Props {
  dataUser: User;
}

const Navbar = ({ dataUser }: Props) => {
  const { logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [toggleOption, setToggleOption] = useState<"SINGOUT" | "SUPPORT" | "">(
    ""
  );
  return (
    <>
      <AlertModal
        title={
          toggleOption === "SINGOUT"
            ? "¿Estás seguro de cerrar sesion?"
            : "Se ha enviado un correo a soporte"
        }
        description={
          toggleOption === "SUPPORT" ? "Te contactaremos lo antes posible" : ""
        }
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() =>
          toggleOption === "SINGOUT" ? logOut() : setOpen(false)
        }
        loading={false}
        advice={toggleOption === "SUPPORT"}
      />

      <StatsModal
        title="Estadisticas"
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        id={dataUser.user_id}
      />

      <SupportModal
        title="¿Cómo podemos ayudarte?"
        isOpen={openSupport}
        onClose={() => setOpenSupport(false)}
        onConfirm={() => {
          setToggleOption("SUPPORT");
          setOpen(true);
        }}
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
              onClick={() => setOpenSupport(true)}
              className={`flex items-center p-2 text-gray-900 rounded-lg`}
            >
              <HelpCircle className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">Soporte</span>
            </button>
            <button
              onClick={() => {
                setToggleOption("SINGOUT");
                setOpen(true);
              }}
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
