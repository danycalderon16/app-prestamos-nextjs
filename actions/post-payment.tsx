import firebase_app from "@/firebase/config";
import { CreatePayment, Payment } from "@/interfaces";
import { Loan } from "@/interfaces/loans";
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

export const postPayment = async (data: { payment: CreatePayment, loan:Loan,user_id:string   }) => {
  const db = getFirestore(firebase_app);
  const id = generateID(data.payment.fecha);

  const abono  = data.payment.abono;

  const loan = data.loan

  const paymentPost: Payment = {
    abono,
    fecha: transformDate(data.payment.fecha),
    id,
    saldo:loan.saldo-abono
  };
  try {
    let stats:UserLoan;

    const userDoc = doc(db, `usuarios/${data.user_id}`);

    const resTotal = await getDoc(userDoc)
    if(!resTotal.exists()){
      throw new Error("No existe el usuario")
    }
    stats = resTotal.data() as UserLoan;    

    const res = await setDoc(
      // doc(db, `usuarios/${data.user_id}/${id}`),
      doc(db, `usuarios/${data.user_id}/prestamos/${loan.id}/abonos/${id}`),
      { ...paymentPost }
    );

    
    let totalRecuperar = stats.totalRecuperar;
    let totalGanar = stats.totalGanar;
    
    if(loan.cantidadPrestada-(loan.monto*(loan.abonos+1))>=0){
      totalRecuperar = data.payment.abono;
    }else{
      const residuo = (loan.cantidadPrestada-loan.abonos*loan.monto)
      totalRecuperar = stats.totalRecuperar - residuo;
      totalGanar = stats.totalGanar -(data.payment.abono - residuo);;
    }
    const total = stats.total - paymentPost.abono;
    await updateDoc(userDoc,{
      total,
      totalGanar,
      totalRecuperar
    })
    
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear el prestamo");
  }
};
