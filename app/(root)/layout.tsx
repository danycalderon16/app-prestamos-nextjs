"use client"
import React from 'react'
import { redirect } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';


export default async function RootLayout({
  children
}:{
  children: React.ReactNode;
}) {
  const {user} = UserAuth()
  if(!user) {
    redirect("sign-in")
  }
  
  return (
    <div>
      <p>{user.displayName}</p>
      {children}
    </div>
  )
}
