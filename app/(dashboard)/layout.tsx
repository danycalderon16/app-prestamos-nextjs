import React from "react";
import SideMenu from "@/components/side-menu";
import { BottomMenu } from "@/components/bottom-menu";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-64 h-full">
      {children}
      <SideMenu />
      <BottomMenu />
    </div>
  );
}
