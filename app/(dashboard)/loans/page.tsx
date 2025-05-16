import React from "react";
import { Loans } from "./components/loans";
import { getLoans } from "@/actions/get-loans";
import AutosumLabel from "@/components/autosum-label";
const LoansPage = async () => {
  const loans = await getLoans();
  return (
    <div className="m-4">
      <Loans loans={loans ?? []} />
      <AutosumLabel />
    </div>
  );
};
export default LoansPage;
