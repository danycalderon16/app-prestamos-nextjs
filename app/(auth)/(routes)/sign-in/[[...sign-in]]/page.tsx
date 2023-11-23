"use client"

import { UserAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
export default function Page() {

  const {user, googleSignIn} = UserAuth()
  const showPopUp =async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(user){
      redirect("/")
    }
  
    
  }, [user])
  
  return <div className="flex">
    <button onClick={showPopUp}>Sign in</button>
  </div>;
}
