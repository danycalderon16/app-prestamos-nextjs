"use client";

import { CompletedLoan } from "@/interfaces";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props {
  loanCompleted: CompletedLoan;
}

export default function Completed({ loanCompleted }: Props) {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div className="shadow-md p-2 rounded-md cursor-pointer" onClick={()=>setShowMore(prev => !prev)}>
      <div className="grid grid-cols-11">
        <span className="col-span-3">{loanCompleted.nombre}</span>
        <span className="col-span-3 flex justify-center text-green-600 font-bold">
          {(loanCompleted.ganancia).toLocaleString(
            "es-MX",
            {
              style: "currency",
              currency: "MXN",
            }
          )}
        </span>
        <div className="col-span-5 flex justify-end italic items-center gap-2">
          <span>{loanCompleted.fecha_final}</span>
          <ChevronUp className={`text-gray-600 transition-all duration-300 ${
            showMore? 'rotate-180' : ''
          }`} size={20} />
          
        </div>
      </div>
      <div className={`${showMore ? 'grid' : 'hidden'} grid-cols-2 grid-rows-2 gap-x-2 mt-2 transition-all duration-700`}>
        <span className="flex justify-end">Fecha prestamo</span>
        <span className="flex justify-start">{loanCompleted.fecha_prestamo}</span>
        <span className="flex justify-end">Cantidad prestada</span>
        <span className="flex justify-start text-blue-500">
          {loanCompleted.cantidadPrestada.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
      </div>
    </div>
  );
}
