"use client"
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loan } from "@/interfaces/loans";
import { CheckCircle, MoreHorizontal, Trash2 } from "lucide-react";
interface Props {
  loan: Loan;
}

export default function InfoLoan({ loan }: Props) {
  return (
    <div className="flex flex-col w-[380px] sm:w-[500px] mt-5 border p-2 rounded-md shadow-md">
      <div className="flex w-full justify-around items-center">
        <span className="text-xl font-bold sm:text-2xl">{loan.nombre}</span>
        <div className="flex flex-col items-center">
          <span className="text-base sm:text-xl text-red-600 font-bold">
            {loan.saldo.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </span>
          <span className="text-sm sm:text-base text-blue-600">
            {loan.fecha}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 items-center place-items-center mt-4 ">
        <span className="">Saldo inicial</span>
        <span className="">Abonado</span>
        <span className="">Prestamo</span>
        <span className="font-light">
          {(loan.plazos * loan.monto).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
        <span className="font-light">
          {loan.abonado.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
        <span className="font-light">
          {loan.cantidadPrestada.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </span>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 items-center place-items-center mt-4 ">
        <span className="">Anbonos</span>
        <span className="">Tipo</span>
        <div className="row-span-2">
          <Popover>
            <PopoverTrigger>
              <Button variant={"outline"}>
                <MoreHorizontal className="text-gray-600" size={30} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
            <button
              onClick={() =>{}}
              className={`flex items-center p-2 text-gray-900 rounded-lg`}
            >
              <CheckCircle className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Marcar como completado
              </span>
            </button>
            <button
              onClick={() => {}}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Trash2 className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Eliminar prestamo
              </span>
            </button>
            </PopoverContent>
          </Popover>
        </div>
        <span className="font-light">
          {loan.abonos}/{loan.plazos}
        </span>
        <span className="font-light">{loan.tipo}</span>
      </div>
    </div>
  );
}
