import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loan } from "@/interfaces/loans";
import React from "react";

interface Props {
  loan: Loan;
}

const Loan: React.FC<Props> = ({ loan }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{loan.nombre}</CardTitle>
        <CardDescription>${loan.cantidadPrestada}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>`{loan.abonos}/{loan.plazos}`</p>
      </CardContent>
      <CardFooter>
        <p>${loan.abonado}</p>
      </CardFooter>
    </Card>
  );
};

export default Loan;
