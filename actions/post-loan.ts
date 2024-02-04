import firebase_app from "@/firebase/config";
import { CreateLoan, Loan } from "@/interfaces/loans";
import { generateID, transformDate } from "@/lib/helpers";
import {
  Transaction,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const postLoan = async (data: { loan: CreateLoan; user_id: string }) => {
  const db = getFirestore(firebase_app);
  const id = generateID();

  const loanPost: Loan = {
    id,
    abonado: 0,
    abonos: 0,
    cantidadPrestada: data.loan.cantidadPrestada,
    fecha: transformDate(data.loan.fecha),
    monto: data.loan.monto,
    nombre: data.loan.nombre,
    plazos: data.loan.plazos,
    saldo: data.loan.monto * data.loan.plazos,
    tipo: data.loan.tipo,
  };
  try {
    const res = await setDoc(
      doc(db, `usuarios/${data.user_id}/prestamos/${id}`),
      { ...loanPost }
    );
    console.log("Exito: ", res);
  } catch (error) {
    console.error(error);
  }
};
