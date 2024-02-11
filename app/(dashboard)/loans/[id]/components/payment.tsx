"use client";
import { deletePayment } from "@/actions/delete-payment";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useLoans from "@/hooks/useLoans";
import useNotifications from "@/hooks/useNotifications";
import { Payment } from "@/interfaces";
import { MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  payment: Payment;
}

export function Payment({ payment }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const {id, currentLoan} =useLoans();
  const { snackBar } = useNotifications()
  const router = useRouter();

  const confirmDeletePayment = () => {
    deletePayment(currentLoan.id.toString(),id,payment.id.toString())
      .then(res=> {
        snackBar({
          message:"Abono borrado correctamente",
          type:"success",
          time:2000
        })
        router.refresh();
      })
      .catch(res=> {
        snackBar({
          message:"Hubo un error",
          type:"error",
          time:2000
        })
        console.error(res);
      }).finally(()=> {
        setIsOpen(false)
      })
  }
  return (
    <>
      <AlertModal
        title="¿Estás seguro de cerrar borrar este abono?"
        description="Esta acción no se podrá deshacer"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => confirmDeletePayment()}
        loading={false}
      />
      <div className="flex float-end gap-2 items-start">
        <div className="flex flex-col gap-2 w-[340px] sm:w-[470px] border-b-2 cursor-pointer">
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
        <Popover>
          <PopoverTrigger>
            <MoreVertical size={20} className="text-gray-500 mt-1" />
          </PopoverTrigger>
          <PopoverContent>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Trash2 className="text-gray-500" size={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Eliminar abono
              </span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
