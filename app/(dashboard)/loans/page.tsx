import React from 'react'
import {Loans} from './components/loans';
import { getLoans } from '@/actions/get-loans';
import useLoans from '@/hooks/useLoans';
import { getStats } from '@/actions/get-Stats';

const LoansPage = async() => { 

  const loans = await getLoans();
  const stats = await getStats();
  
  return (
    <div className='m-4'>
  
      <Loans loans={loans??[]}
       stats={stats}
       />
    </div>
  )
}

export default LoansPage