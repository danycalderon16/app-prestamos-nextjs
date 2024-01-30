"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { logOut, user } = UserAuth();
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

      <div className="flex justify-between p-3 items-center sm:hidden shadow-md">
        <h1 className="text-3xl">App Prestamos</h1>
        <div className="flex justify-between gap-2 items-center">
         
          <h3>{user?.displayName}</h3>
          {/* <Image
            width={50}
            height={50}
            className="w-10 h-10 rounded-full cursor-pointer"
            src={user.data?.user?.image!}
            alt="user"
            onClick={()=>setOpen(true)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
