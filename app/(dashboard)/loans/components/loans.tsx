import { useLoans } from "@/hooks/useLoans";
import { Loan } from "@/interfaces/loans";
import React from "react";
import LoanCard from "./loan";

interface Props {
  loans: Loan[];
}

export function Loans({loans}:Props) {
  // const {loans} = await useLoans()
  // console.log({loans});

  return (
     <>{loans.map(loan=>(
      <LoanCard key={loan.id} loan={loan}/>
     ))}</>
  );
}
