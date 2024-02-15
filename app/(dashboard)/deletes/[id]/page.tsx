
import React from "react";
import InfoLoan from "./components/info-loan";
import { NotFuound } from "@/components/not-found";
import {PaymentList} from "./components/payments-list";
import { getLoanDeletes } from "@/actions/get-loan-deletes";
import { getPaymentsDeleted } from "@/actions/get-payments-deletes";

export default async function Page({
  params,
}: {
  params: {
    [x: string]: any;
    slug: string;
  }
}) {
  const loanId = params.id;
  const loan = await getLoanDeletes(loanId!);
  if (!loan) {
    return (
      <div>
        <NotFuound text="Prestamo no encontrado" />
      </div>
    );
  }

  const payments = await getPaymentsDeleted(loanId!);
  return (
    <div className="w-full flex justify-center flex-col items-center gap-3">
      <InfoLoan loan={loan} />
      <PaymentList payments={payments??[]} />
    </div>
  );
}
