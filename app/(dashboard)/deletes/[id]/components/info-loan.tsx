"use client";
import { deleteDeleted } from "@/actions/delete-deleted";
import { restoreLoan } from "@/actions/restore-loan";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useLoans from "@/hooks/useLoans";
import useNotifications from "@/hooks/useNotifications";
import { Loan } from "@/interfaces/loans";
import { ArchiveRestoreIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Props {
  loan: Loan;
}

export default function InfoLoan({ loan }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useLoans();
  const [toggleOption, setToggleOption] = useState<"RESTORE" | "DELETE" | "">(
    ""
  );
  const { snackBar } = useNotifications();

  const confitmDeleteLoan = () => {
    deleteDeleted(loan.id.toString(), id)
      .then((res) => {
        snackBar({
          message: "Prestamo eliminado correctamente",
          type: "success",
          time: 2000,
        });
        router.replace("/deletes");
      })
      .catch((res) => {
        snackBar({
          message: "Hubo un error",
          type: "error",
          time: 2000,
        });
        console.error(res);
      })
      .finally(() => {
        setIsOpen(false);
      });
  };

  const confirmRestoreLoan = () => {
    restoreLoan(loan.id.toString(), id.toString())
      .then((res) => {
        snackBar({
          message: "Prestamo restaurado correctamente",
          type: "success",
          time: 2000,
        });
        router.replace("/loans");
      })
      .catch((res) => {
        snackBar({
          message: res.message,
          type: "error",
          time: 2000,
        });
      })
      .finally(() => {
        setIsOpen(false);
      });
  };

  return (
    <>
      <AlertModal
        title={`¿Está seguro de ${
          toggleOption === "RESTORE" ? "restaurar" : "eliminar"
        } este prestamo?`}
        description={toggleOption === "RESTORE" ? "" : "Esta acción no se podrá deshacer"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={()=>{
          toggleOption === "DELETE" ? confitmDeleteLoan() : confirmRestoreLoan()
        }}
        loading={false}
      />
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
                  onClick={() => {
                    setToggleOption("RESTORE");
                    setIsOpen(true);
                  }}
                  className={`flex items-center p-2 text-gray-900 rounded-lg`}
                >
                  <ArchiveRestoreIcon className="text-gray-500" size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Restaurar prestamo
                  </span>
                </button>
                <button
                  onClick={() => {
                    setToggleOption("DELETE");
                    setIsOpen(true);
                  }}
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
    </>
  );
}
