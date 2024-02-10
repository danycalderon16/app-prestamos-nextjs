import firebase_app from "@/firebase/config";
import { Payment } from "@/interfaces";
import { Loan } from "@/interfaces/loans";
import { UserLoan } from "@/interfaces/userLoan";
import { getFirestore, getDoc, doc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export const deletePayment = async (loanId:string,userId:string,paymentId:string) => {
  try {
    const db = getFirestore(firebase_app)

    const path = `usuarios/${userId}/prestamos/${loanId}`

    const loanDoc = (doc(db,`${path}`));

    const data = await getDoc(loanDoc);
    const loan = data.data() as Loan;

    let stats:UserLoan;

    const userDoc = doc(db, `usuarios/${userId}`);

    const resStats = await getDoc(userDoc)
    if(!resStats.exists()){
      throw new Error("No existe el usuario")
    }
    stats = resStats.data() as UserLoan;    


    let totalRecuperar = stats.totalRecuperar;
    let totalGanar = stats.totalGanar;
    if(loan.abonado<loan.cantidadPrestada){
      totalRecuperar = totalRecuperar + loan.monto
    }else{
      const residuo = loan.abonado - loan.cantidadPrestada;
      totalRecuperar = totalRecuperar + (loan.monto - residuo)
      totalGanar = totalGanar - residuo
    }

    await updateDoc(userDoc,{
      total: totalGanar + totalRecuperar,
      totalGanar,
      totalRecuperar
    })

    const res = await deleteDoc(doc(db, `${path}/abonos/${paymentId}`))

    return res;
 
  } catch (error) {
    console.error(error);
    return null;
  }
}