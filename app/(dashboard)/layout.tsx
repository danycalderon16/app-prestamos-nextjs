import React from "react";

import { getUser } from "@/lib/utilsServer";
import BottomMenu from "@/components/bottom-menu";
import FloatButton from "@/components/float-button";
import Navbar from "@/components/navbar";
import { SideMenu } from "@/components/side-menu";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataUser = getUser();
  return (
    <div className="md:ml-64 h-full">
      <Navbar dataUser={dataUser!} />
      {children}
      <SideMenu dataUser={dataUser!} />
      <FloatButton id={dataUser?.user_id!} />
      <BottomMenu />
    </div>
  );
}
