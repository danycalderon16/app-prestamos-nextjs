import { headers } from 'next/headers';

import useLoans from '@/hooks/useLoans';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { getUser } from '@/lib/utilsServer';
import { getLoan } from '@/actions/get-loan';

const Loan = async () => {
  const headersList = headers();
  const fullUrl =  headersList.get('referer') || "";
  console.log({fullUrl});
  

  const pathname = fullUrl.split("/")[4];  
  const id = pathname.split("?")  
  const user = getUser()
  if(user?.user_id!==id[0]){
    redirect("/loans")
  }

  const params = pathname.split("=")

  const loan = await getLoan(params[1])
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

export default Loan