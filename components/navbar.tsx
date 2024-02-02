"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "@/interfaces/user";
interface Props{
  dataUser:User;
}

const Navbar = ({dataUser}:Props) => {
  const { logOut } = UserAuth();
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

      <div className="flex justify-between p-3 items-center shadow-md">
        <h1 className="text-3xl">App Prestamos</h1>
        <div className="flex justify-between gap-2 items-center sm:hidden">
         
          <h3>{dataUser?.name}</h3>
          <Image
            width={50}
            height={50}
            className="w-10 h-10 rounded-full cursor-pointer"
            src={dataUser.picture}
            alt="user"
            onClick={()=>setOpen(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
