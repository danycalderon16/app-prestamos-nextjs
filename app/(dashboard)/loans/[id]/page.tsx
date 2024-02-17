
import React from "react";
import { getLoan, getPayments } from "@/actions";
import InfoLoan from "./components/info-loan";
import { NotFuound } from "@/components/not-found";
import {PaymentList} from "./components/payments-list";

export default async function Page({
  params,
}: {
  params: {
    [x: string]: any;
    slug: string;
  }
}) {
  const loanId = params.id;
  const loan = await getLoan(loanId!);
  if (!loan) {
    return (
      <div>
        <NotFuound text="Prestamo no encontrado" />
      </div>
    );
  }

  const payments = await getPayments(loanId!);
  return (
    <div className="w-full flex justify-center flex-col items-center gap-3">
      <InfoLoan loan={loan} />
      <PaymentList payments={payments??[]} loan={loan} />
    </div>
  );
}
