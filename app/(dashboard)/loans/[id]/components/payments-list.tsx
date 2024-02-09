"use client"
import { Payment } from "@/interfaces";
import { Payment as PaymentCard } from "./payment";
import usePayments from "@/hooks/usePayments";
import { NewPaymentModal } from "@/components/modals/new-payment-modal";

interface Props {
  payments: Payment[];
}

export function PaymentList({ payments }: Props) {
  const {toggle, onToggle} = usePayments();
  
  return (
    <>
    <NewPaymentModal
     title="Nuevo abono"
     isOpen={toggle}
     onClose={() => onToggle()}
    />
    <div className="flex flex-col gap-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment}/>
        ))}
    </div>
        </>
  );
}
