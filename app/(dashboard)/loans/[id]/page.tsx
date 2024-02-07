import { headers } from 'next/headers';

import useLoans from '@/hooks/useLoans';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { getUser } from '@/lib/utilsServer';
import { getLoan } from '@/actions/get-loan';
import InfoLoan from './components/info-loan';

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    [x: string]: any; slug: string 
}
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  
 const userId = params.id;
 const loanID = searchParams.id?.toString();
  

  const user = getUser()
  if(user?.user_id!==userId){
    redirect("/loans")
  }

  const loan = await getLoan(loanID!)
  if(!loan){
    return (<>
    <div>Loan not found</div>
    </>)
  }
  
  return (
    <>
    <div>{loan.fecha}</div>
    <div>{loan.saldo}</div>
    <div>{loan.plazos}</div>
    <div>{loan.abonos}</div>
    <div>{loan.abonado}</div>

    </>
  )
}
