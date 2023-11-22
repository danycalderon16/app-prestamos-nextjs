import React from 'react'
import { getAuth } from 'firebase/auth'
import firebase_app from '@/firebase/config'
import { redirect } from 'next/navigation';

const auth = getAuth(firebase_app);
export default async function RootLayout({
  children
}:{
  children: React.ReactNode;
}) {

  if(!auth.currentUser) {
    redirect("sign-in")
  }
  
  return (
    <>
      {children}
    </>
  )
}
