"use client"
import { Loan } from "@/interfaces/loans";
import LoanCard from "./loan";

interface Props {
  deletes: Loan[];
}

export function DeletesLoans({ deletes }: Props) {  
  return (
    <div>
      <div
        className={`
     w-full flex flex-col items-center gap-4`}
      >
        {deletes.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
}
