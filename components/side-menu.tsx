"use client";
import { UserAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import Link from "next/link";
import { useLoans } from "@/hooks/useLoans";
import { CircleDollarSign, CheckCircle, Trash, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const { logOut, user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  return (
    <>
      <AlertModal
        title="¿Estás seguro de cerrar sesion?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={()=>signOut(auth).then(()=>{
          router.replace("/sign-in")  
        })}
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
                <CircleDollarSign className="text-gray-500" size={30} />
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
                <CheckCircle className="text-gray-500" size={30} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Completados
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/deletes"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Trash className="text-gray-500" size={30} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Eliminados
                </span>
              </Link>
            </li>

            <li className="mt-auto">
              <div>
                <div className="flex gap-3 items-center mb-3 pb-2 border-b border-slate-600">
                  {user && (
                    <>
                      {/* <Image
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                        src={user.data?.user?.image!}
                        alt="user"
                      /> */}
                      <p>{user.displayName}</p>
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

export default SideMenu;
