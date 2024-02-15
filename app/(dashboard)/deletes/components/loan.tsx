"use client";
import { Card } from "@/components/ui/card";
import useLoans from "@/hooks/useLoans";
import { Loan } from "@/interfaces/loans";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  loan: Loan;
}

const Loan: React.FC<Props> = ({ loan }) => {
  const {saveLoan} = useLoans();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  return (
    <Card
      key={loan.id}
      className="flex sm:w-[500px] lg:w-[600px] p-2 gap-2 cursor-pointer"
      onClick={() => {
        setToggle((prev) => !prev);
      }}
    >
      <div
        className={`w-[20px] rounded-sm ${
          loan.tipo === "Semanal" ? "bg-green-700" : "bg-red-600"
        }`}
      />
      <div className="w-full flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm lg:text-base font-bold">
            {loan.nombre}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm lg:text-base font-bold text-blue-600">
              {loan.fecha}
            </span>
            <Eye
              className="text-gray-500"
              onClick={() => {
                saveLoan(loan);
                setToggle((prev) => !prev);
                router.push(`/deletes/${loan.id}`);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-4">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Prestamo
            </span>
            <span className="text-xs sm:text-sm lg:text-base ">
              ${loan.saldo}
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Saldo
            </span>
            <span className="text-xs sm:text-sm lg:text-base text-red-600">
              ${loan.saldo}
            </span>
          </div>
          <div className=" col-span-3 flex justify-end">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Abonos
            </span>
            <span className="text-xs sm:text-sm lg:text-base ">
              {loan.abonos}/{loan.plazos}
            </span>
          </div>
        </div>
        <div
          className={`${toggle ? "grid" : "hidden"} grid grid-cols-10 gap-4`}
        >
          <div className="col-span-4">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Saldo inicial
            </span>
            <span className="text-xs sm:text-sm lg:text-base ">
              ${loan.cantidadPrestada}
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Abonado
            </span>
            <span className="text-xs sm:text-sm lg:text-base text-red-600">
              ${loan.abonado}
            </span>
          </div>
          <div className="col-span-3 flex justify-end">
            <span className="text-xs sm:text-sm lg:text-base font-bold mr-2">
              Abono
            </span>
            <span className="text-xs sm:text-sm lg:text-base ">
              {loan.monto}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Loan;
