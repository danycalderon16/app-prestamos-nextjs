import React from "react";

import { getUser } from "@/lib/utilsServer";
import BottomMenu from "@/components/bottom-menu";
import FloatButton from "@/components/float-button";
import Navbar from "@/components/navbar";
import { SideMenu } from "@/components/side-menu";
import SnackBar from "@/components/snack-bar";
import { verifyUser } from "@/actions/verify-user";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataUser = getUser();
 
  verifyUser(dataUser!);
    
  return (
    <div className="md:ml-64 h-full">
      <Navbar dataUser={dataUser!} />
      {children}
      <SideMenu dataUser={dataUser!} />
      <FloatButton id={dataUser?.user_id!} />
      <BottomMenu />
      <SnackBar/>
    </div>
  );
}
