
import React from 'react'
import { redirect } from 'next/navigation';
import { auth } from '@/firebase/config';
import { signIn, useSession, signOut } from "next-auth/react";
export default async function RootLayout({
  children
}:{
  children: React.ReactNode;
}) {
  const {data} = useSession()
  console.log(data);
  
  if(!data) {
    console.log({data});    
    redirect("sign-in")
  }
  
  return (
    <div className='w-full bg-red'>
      {children}
    </div>
  )
}
