import React from "react";
import SideMenu from "@/components/side-menu";
import { BottomMenu } from "@/components/bottom-menu";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";
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
