"use client";
import { Payment } from "@/interfaces";
import { Payment as PaymentCard } from "./payment";
import usePayments from "@/hooks/usePayments";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  payments: Payment[];
}

export function PaymentList({ payments }: Props) {
  const { toggle, onToggle } = usePayments();

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [toggle]);

  return (
    <div className="flex flex-col gap-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
