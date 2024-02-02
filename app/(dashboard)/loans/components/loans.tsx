import { useLoans } from "@/hooks/useLoans";
import { Loan } from "@/interfaces/loans";
import React from "react";
import LoanCard from "./loan";

interface Props {
  loans: Loan[];
}

export function Loans({loans}:Props) {
  return (
     <>{loans.map(loan=>(
      <LoanCard key={loan.id} loan={loan}/>
     ))}</>
  );
}
