import { Payment } from "@/interfaces";
import { Payment as PaymentCard } from "./payment";

interface Props {
  payments: Payment[];
}

export function PaymentList({ payments }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment}/>
      ))}
    </div>
  );
}
