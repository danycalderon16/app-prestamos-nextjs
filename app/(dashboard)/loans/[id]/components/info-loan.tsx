'use client';

import { getLoan } from "@/actions/get-loan";
import { getLoans } from "@/actions/get-loans";
import { useParams, usePathname, useSearchParams } from "next/navigation";

interface Props{
  userId:string
}

export default function InfoLoan({userId}:Props) {
 
  const path = usePathname();
  const params = useSearchParams();
  const pa = useParams()
  console.log(path, params.getAll("id")[0],pa.id);

  // if(p)

  const loans = getLoan(params.getAll("id")[0]!)
  
  
  return (
    <div>
      {/* {loans.} */}
    </div>
  );
}