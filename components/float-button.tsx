"use client"
import { postLoan } from '@/actions/post-loan';
import loan from '@/app/(dashboard)/loans/components/loan';
import { Loan } from '@/interfaces/loans';
import { Plus } from 'lucide-react';
import React from 'react'

interface Props{
  id:string;
}

const  FloatButton= ({id}:Props) => {

  const addNewLoan = () => {
   
  }
  return (
    <div className={`
    fixed
    z-90
    bottom-24
    md:bottom-6
    right-8
    w-[50px]
    h-[50px]
    bg-sky-500
    rounded-full
    drop-shadow-lg
    flex
    justify-center
    items-center
    cursor-pointer
    hover:drop-shadow-2xl
    hover:bg-sky-600
    duratio-300
    `}
    onClick={()=>{
      const dummy:Loan = {
        id:202403024,
        abonado:0,
        abonos:0,
        cantidadPrestada:1000,
        fecha:new Date().toISOString(),
        monto:300,
        nombre:"Alejandro",
        plazos:4,
        saldo:1200,
        tipo: 'Semanal'
      }
      postLoan({loan:dummy, user_id:id})
    }
    }>
      <Plus className='text-white' size={40}/>
    </div>
  )
}

export default FloatButton;