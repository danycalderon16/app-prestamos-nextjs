import { Button } from "@/components/ui/button";
import { Loan } from "@/interfaces/loans";
interface Props {
  loan: Loan;
}

export default function InfoLoan({ loan }: Props) {
  return (
    <div className="flex flex-col w-[500px] mt-5 border p-2 rounded-md shadow-md">
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
        <Button className="row-span-2" variant={"outline"}>Añadir</Button>
        <span className="font-light">
          {loan.abonos}/{loan.plazos}
        </span>
        <span className="font-light">{loan.tipo}</span>
      </div>
    </div>
  );
}
