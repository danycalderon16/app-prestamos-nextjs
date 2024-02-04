"use client"
import { Loan } from "@/interfaces/loans";
import React, { useState } from "react";
import LoanCard from "./loan";
import { NewLoanModal } from "@/components/modals/new-loan-modal";
import useLoans from "@/hooks/useLoans";

interface Props {
  loans: Loan[];
}

export function Loans({ loans }: Props) {
  const { onToggle, toggle, id } = useLoans();
  const [loading, setLoading] = useState(false);

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
      key={""}
        className={`
     w-full flex flex-col items-center gap-4`}
      >
        {loans.map((loan) => (
          <LoanCard key={loan.fecha} loan={loan} />
        ))}
      </div>
    </div>
  );
}
