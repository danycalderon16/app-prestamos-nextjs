"use client"
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import SideMenu from "@/components/side-menu";

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
    <>
      {children}
      <SideMenu />
    </>
  );
}
