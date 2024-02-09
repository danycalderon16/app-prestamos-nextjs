import firebase_app from "@/firebase/config";
import { CreatePayment, Payment } from "@/interfaces";
import { UserLoan } from "@/interfaces/userLoan";
import { generateID, transformDate } from "@/lib/helpers";
import { getUser } from "@/lib/utilsServer";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export const postPayment = async (data: { payment: CreatePayment; loan_id: string }) => {
  const db = getFirestore(firebase_app);
  const id = generateID();

  const paymentPost: Payment = {
    abono: data.payment.abono,
    fecha: transformDate(data.payment.fecha),
    id,
    saldo:0
  };
  try {
    let totals:UserLoan;

    const user_id = getUser()?.user_id;

    const userDoc = doc(db, `usuarios/${user_id}`);

    const resTotal = await getDoc(userDoc)
    if(!resTotal.exists()){
      throw new Error("No existe el usuario")
    }
    totals = resTotal.data() as UserLoan;    

    const res = await setDoc(
      // doc(db, `usuarios/${data.user_id}/${id}`),
      doc(db, `usuarios/${user_id}/prestamos/${id}`),
      { ...paymentPost }
    );

    // const totalGanar = totals.totalGanar +((loanPost.plazos * loanPost.monto ) - loanPost.cantidadPrestada)
    // const totalRecuperar = totals.totalRecuperar + loanPost.cantidadPrestada
    // await updateDoc(userDoc,{
    //   total: totalGanar + totalRecuperar,
    //   totalGanar,
    //   totalRecuperar
    // })
    
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el prestamo");
  }
};
