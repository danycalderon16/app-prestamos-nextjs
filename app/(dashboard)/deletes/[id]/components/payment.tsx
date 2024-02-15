import { Payment } from "@/interfaces";

interface Props {
  payment: Payment;
}

export function Payment({ payment }: Props) { 
  return (
    <>
      <div className="flex float-end gap-2 items-start">
        <div className="flex flex-col gap-2 w-[340px] sm:w-[470px] border-b-2">
          <div className="flex justify-between">
            <span className="text-sm sm:text-base text-violet-800">
              {payment.fecha}
            </span>
            <span className="text-sm sm:text-base text-green-600 font-bold">
              {payment.abono.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs sm:text-sm italic">Abono</span>
            <span className="text-xs sm:text-sm  italic">
              {payment.saldo.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
