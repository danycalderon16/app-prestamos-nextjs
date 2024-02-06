import firebase_app from "@/firebase/config";
import { CreateLoan, Loan } from "@/interfaces/loans";
import { UserLoan } from "@/interfaces/userLoan";
import { generateID, transformDate } from "@/lib/helpers";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { getStats } from "./get-Stats";

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
    let totals:UserLoan;

    const userDoc = doc(db, `usuarios/${data.user_id}`);

    const resTotal = await getDoc(userDoc)
    if(!resTotal.exists()){
      throw new Error("No existe el usuario")
    }
    totals = resTotal.data() as UserLoan;    

    const res = await setDoc(
      // doc(db, `usuarios/${data.user_id}/${id}`),
      doc(db, `usuarios/${data.user_id}/prestamos/${id}`),
      { ...loanPost }
    );

    const totalGanar = totals.totalGanar +((loanPost.plazos * loanPost.monto ) - loanPost.cantidadPrestada)
    const totalRecuperar = totals.totalRecuperar + loanPost.cantidadPrestada
    await updateDoc(userDoc,{
      total: totalGanar + totalRecuperar,
      totalGanar,
      totalRecuperar
    })
    
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el prestamo");
  }
};
