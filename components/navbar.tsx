"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";

const Navbar = () => {
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

      <div className="flex justify-between bg-white p-3 items-center">
        <h2>App Prestamos</h2>
        <div className="flex justify-between gap-2 items-center">
          <h3>{user?.displayName}</h3>
          <button
            className={`text-gray-900 
              bg-white border 
              border-gray-300 
              focus:outline-none 
              hover:bg-gray-100 
              focus:ring-4 
              focus:ring-gray-200 
              font-medium rounded-lg 
              text-sm px-5 
              p-2.5 me-2 
              dark:bg-gray-800 
              dark:text-white 
              dark:border-gray-600 
              dark:hover:bg-gray-700 
              dark:hover:border-gray-600 
              dark:focus:ring-gray-700`}
            onClick={() => setOpen(true)}
          >
            Salir
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
