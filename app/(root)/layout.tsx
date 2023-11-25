import React from 'react'
import { redirect } from 'next/navigation';
import { auth } from '@/firebase/config';
export default async function RootLayout({
  children
}:{
  children: React.ReactNode;
}) {
  const user = auth.currentUser
  if(!user) {
    console.log({user});    
    redirect("sign-in")
  }
  
  return (
    <div className='w-full bg-red'>
      {children}
    </div>
  )
}
