"use client"
import { Loan, Payment } from "@/interfaces";
import { Payment as PaymentCard } from "./payment";
import usePayments from "@/hooks/usePayments";
import { NewPaymentModal } from "@/components/modals";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  payments: Payment[];
  loan: Loan;
}

export function PaymentList({ payments, loan }: Props) {
  const {toggle, onToggle} = usePayments();

  const router = useRouter();
  useEffect(() => {
    router.refresh()
  }, [toggle])
    
  return (
    <>
    <NewPaymentModal
     title="Nuevo abono"
     isOpen={toggle}
     onClose={() => onToggle()}
     amount={loan.monto}
    />
    <div className="flex flex-col gap-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment}/>
        ))}
    </div>
        </>
  );
}
