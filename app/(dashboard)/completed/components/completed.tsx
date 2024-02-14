"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { CompletedLoan } from "@/interfaces";
import { ChevronUp, Trash } from "lucide-react";
import { useState } from "react";

interface Props {
  loanCompleted: CompletedLoan;
}

export default function Completed({ loanCompleted }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setShowMore((prev) => !prev)
  }

  return (
    <>
       <AlertModal
        title="¿Estás seguro de eliminar el prestamo completado?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={false}
      />
    <div
      className="shadow-md p-2 rounded-md cursor-pointer"
      onClick={() => setShowMore((prev) => !prev)}
    >
      <div className="grid grid-cols-11">
        <span className="col-span-3">{loanCompleted.nombre}</span>
        <span className="col-span-3 flex justify-center text-green-600 font-bold">
          {loanCompleted.ganancia.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
        <div className="col-span-5 flex justify-end italic items-center gap-2">
          <span>{loanCompleted.fecha_final}</span>
          <ChevronUp
            className={`text-gray-600 transition-all duration-300 ${
              showMore ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>
      </div>
      <div
        className={`${
          showMore ? "grid" : "hidden"
        } grid-cols-2 grid-rows-2 gap-x-2 mt-2 transition-all duration-700`}
      >
        <span className="flex justify-end">Fecha prestamo</span>
        <span className="flex justify-start">
          {loanCompleted.fecha_prestamo}
        </span>
        <span className="flex justify-end">Cantidad prestada</span>
        <div className="flex justify-between items-center">
          <span className=" text-blue-500">
            {loanCompleted.cantidadPrestada.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </span>
          <Trash size={20} className="text-gray-600 cursor-pointer" onClick={()=>setOpen(true)}/>
        </div>
      </div>
    </div>
    </>
  );
}
