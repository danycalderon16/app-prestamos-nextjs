import { UserAuth } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { useLoans } from '@/hooks/useLoans'
import { Loan } from '@/interfaces/loans';
import React, { useEffect, useState } from 'react'
import LoanCard from './loan';

interface Props {
  uid: string
}

export async function Loans() {
  const {user} = UserAuth()
  const {loans} = await useLoans({uid:user?.uid})
  return (
   <>{loans.map(loan=>(
    <LoanCard key={loan.id} loan={loan}/>
   ))}</>
  )
}
