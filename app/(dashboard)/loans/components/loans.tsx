import { useLoans } from "@/hooks/useLoans";
import { Loan } from "@/interfaces/loans";
import React from "react";
import LoanCard from "./loan";

interface Props {
  loans: Loan[];
}

export function Loans({ loans }: Props) {
  return (
    <div className={`
     w-full flex flex-col items-center gap-2`}>
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </div>
  );
}

