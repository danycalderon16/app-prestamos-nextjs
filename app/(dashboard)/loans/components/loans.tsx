"use client"
import { Loan } from "@/interfaces/loans";
import React, { useEffect, useState } from "react";
import LoanCard from "./loan";
import { NewLoanModal } from "@/components/modals/new-loan-modal";
import useLoans from "@/hooks/useLoans";
import { UserLoan } from "@/interfaces/userLoan";
import { useRouter } from "next/navigation";

interface Props {
  loans: Loan[];
  stats?: UserLoan
}

export function Loans({ loans }: Props) {
  const { onToggle, toggle, id, saveStats } = useLoans();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [toggle])
  

  // saveStats(stats)
  return (
    <div>
      <NewLoanModal
        title="Nuevo prestamo"
        isOpen={toggle}
        onClose={() => onToggle()}
        onConfirm={() => onToggle()}
        loading={loading}
        id= {id}
      />
      <div
        className={`
     w-full flex flex-col items-center gap-4`}
      >
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
}
