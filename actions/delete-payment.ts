import firebase_app from "@/firebase/config";
import { Loan, Payment, UserLoan } from "@/interfaces";
import { getFirestore, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const deletePayment = async (loanId:string,userId:string,paymentId:string) => {
  try {
    const db = getFirestore(firebase_app)
    
    const path = `usuarios/${userId}/prestamos/${loanId}`
    
    const userDoc = doc(db, `usuarios/${userId}`);
    const loanDoc = doc(db,`${path}`);
    const paymentDoc = doc(db, `${path}/abonos/${paymentId}`)

    const user = await getDoc(userDoc)
    if(!user.exists()){
      throw new Error("No existe el usuario")
    }    
    const stats = user.data() as UserLoan;    

    const data = await getDoc(loanDoc);
    if(!data.exists()){
      throw new Error("No existe el prestamo");
    }
    const loan = data.data() as Loan;

    const paymentData = await getDoc(paymentDoc)
    if(!paymentData.exists()){
      throw new Error("No existe el abono");
    }
    const payment = paymentData.data() as Payment;

    let totalRecuperar = stats.totalRecuperar;
    let totalGanar = stats.totalGanar;
    if(loan.abonado<loan.cantidadPrestada){
      totalRecuperar = totalRecuperar + payment.abono
    }else{
      const residuo = loan.abonado - loan.cantidadPrestada;
      totalRecuperar = totalRecuperar + (payment.abono - residuo)
      totalGanar = totalGanar - residuo
    }

    await updateDoc(userDoc,{
      total: totalGanar + totalRecuperar,
      totalGanar,
      totalRecuperar
    })

    await updateDoc(loanDoc,{
      abonado: loan.abonado - payment.abono,
      saldo: loan.saldo + payment.abono,
      abonos: loan.abonos - 1,
    })

    const res = await deleteDoc(paymentDoc)

    return res;
 
  } catch (error) {
    console.error(error);
    return null;
  }
}