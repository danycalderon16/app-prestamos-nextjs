import React from 'react'
import {Loans} from './components/loans';
import { getLoans } from '@/actions/get-loans';

const LoansPage = async() => { 

  const loans = await getLoans();

  return (
    <Loans loans={loans}/>
  )
}

export default LoansPage