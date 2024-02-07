import { headers } from "next/headers";

import useLoans from "@/hooks/useLoans";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { getUser } from "@/lib/utilsServer";
import { getLoan } from "@/actions/get-loan";
import InfoLoan from "./components/info-loan";
import { NotFuound } from "@/components/not-found";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    [x: string]: any;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = params.id;
  const loanID = searchParams.id?.toString();

  const user = getUser();
  if (user?.user_id !== userId) {
    redirect("/loans");
  }

  const loan = await getLoan(loanID!);
  if (!loan) {
    return (
      <div>
        <NotFuound text="Prestamo no encontrado" />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center ">
      <InfoLoan loan={loan} />
    </div>
  );
}
