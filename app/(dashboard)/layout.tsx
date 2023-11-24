"use client"
import Navbar from "@/components/navbar";
import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

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
      <Navbar />
      {children}
    </>
  );
}
