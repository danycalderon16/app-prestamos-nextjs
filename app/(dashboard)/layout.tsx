"use client"
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import SideMenu from "@/components/side-menu"
import { BottomMenu } from "@/components/bottom-menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {user} = UserAuth()
  useEffect(()=>{
    if(!user){
      redirect("/sign-in")
    }
  },[user])
  return (
    <div className="ml-64 h-full">
      {children}
      <SideMenu/>
      <BottomMenu/>
    </div>
  );
}
