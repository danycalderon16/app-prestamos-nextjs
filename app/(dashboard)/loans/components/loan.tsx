"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loan } from "@/interfaces/loans";
import React, { useState } from "react";

interface Props {
  loan: Loan;
}

const Loan: React.FC<Props> = ({ loan }) => {
const [toggle, setToggle] = useState(false);

  return (
    <Card className="flex p-2 gap-3 cursor-pointer transition-opacity ease-in-out delay-150 duration-300" onClick={()=>setToggle(prev=>!prev)}>
      <div
        className={`w-[20px] rounded-sm ${
          loan.tipo === "Semanal" ? "bg-green-700" : "bg-red-600"
        }`}
      />
      <div className="w-full">
        <div className="flex justify-between">
          <span className="font-bold">{loan.nombre}</span>
          <span className="font-bold text-blue-600">{loan.fecha}</span>
        </div>
        <div className="grid grid-cols-3">
          <div className="max-w-[200px]">
            <span className="font-bold mr-2">Prestamo</span>
            <span>${loan.saldo}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Saldo</span>
            <span className="text-red-600">${loan.saldo}</span>
          </div>
          <div className="flex justify-end">
            <span className="font-bold mr-2">Abonos</span>
            <span>
              {loan.abonos}/{loan.plazos}
            </span>
          </div>
        </div>
        <div className={`${toggle ? 'grid':'hidden'} grid-cols-3 transition-opacity ease-in-out delay-150 duration-300`}>
          <div>
            <span className="font-bold mr-2">Saldo inicial</span>
            <span>${loan.cantidadPrestada}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Abonado</span>
            <span className="text-red-600">${loan.abonado}</span>
          </div>
          <div className="flex justify-end">
            <span className="font-bold mr-2">Abono</span>
            <span>
              {loan.monto}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Loan;
