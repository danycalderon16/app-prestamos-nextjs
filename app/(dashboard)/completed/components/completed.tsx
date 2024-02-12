"use client";

import { Loan } from "@/interfaces/loans";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  loan: Loan;
}

export default function Completed({ loan }: Props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="shadow-md p-2 rounded-md cursor-pointer" onClick={()=>setShowMore(prev => !prev)}>
      <div className="grid grid-cols-11">
        <span className="col-span-3">{loan.nombre}</span>
        <span className="col-span-3 flex justify-center text-green-600 font-bold">
          {(loan.plazos * loan.monto - loan.cantidadPrestada).toLocaleString(
            "es-MX",
            {
              style: "currency",
              currency: "MXN",
            }
          )}
        </span>
        <div className="col-span-5 flex justify-end italic items-center gap-2">
          <span>{loan.fecha}</span>
          <ChevronUp className={`text-gray-600 transition-all duration-300 ${
            showMore? 'rotate-180' : ''
          }`} size={20} />
          
        </div>
      </div>
      <div className={`${showMore ? 'grid' : 'hidden'} grid-cols-2 grid-rows-2 gap-x-2 mt-2 transition-all duration-700`}>
        <span className="flex justify-end">Fecha prestamo</span>
        <span className="flex justify-start">{loan.fecha}</span>
        <span className="flex justify-end">Cantidad prestada</span>
        <span className="flex justify-start text-blue-500">
          {loan.cantidadPrestada.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
      </div>
    </div>
  );
}
