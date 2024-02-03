import React from "react";
import SideMenu from "@/components/side-menu";
import { BottomMenu } from "@/components/bottom-menu";
import Navbar from "@/components/navbar";
import { getUser } from "@/lib/utilsServer";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {  

  const dataUser = getUser();
  return (
    <div className="md:ml-64 h-full">
      <Navbar dataUser={dataUser!}/>
      {children}
      <SideMenu dataUser={dataUser!}/>
      <BottomMenu />
    </div>
  );
}
