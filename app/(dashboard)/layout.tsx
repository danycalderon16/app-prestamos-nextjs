import React from "react";
import SideMenu from "@/components/side-menu";
import { BottomMenu } from "@/components/bottom-menu";
import Navbar from "@/components/navbar";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sm:ml-64 h-full">
      <Navbar/>
      {children}
      <SideMenu />
      <BottomMenu />
    </div>
  );
}
