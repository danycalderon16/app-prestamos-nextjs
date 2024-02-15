import firebase_app from "@/firebase/config";
import { Payment } from "@/interfaces";
import { Loan } from "@/interfaces/loans";
import { UserLoan } from "@/interfaces/userLoan";
import { getFirestore, getDoc, doc, collection, getDocs, deleteDoc, updateDoc, setDoc } from "firebase/firestore";

export const deleteLoan = async (loanId:string,userId:string) => {
  try {
    const db = getFirestore(firebase_app)

    const path = `usuarios/${userId}/prestamos/${loanId}`

    const loanDoc = (doc(db,`${path}`));

    const data = await getDoc(loanDoc);
    const loan = data.data() as Loan;

    await setDoc(
      doc(db, `usuarios/${userId}/eliminados/${loanId}`),
      { ...loan }
    );

    getDocs(collection(db,`${path}/abonos`)).then((res:any)=>{
      res.docs.map((pay:any)=>{
        const payment = pay.data() as Payment;
        setDoc(doc(db, `usuarios/${userId}/eliminados/${loanId}/abonos/${payment.id}`),payment)
        deleteDoc(doc(db,`${path}/abonos/${payment.id}`));
      })
    })

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
      totalRecuperar = totalRecuperar - (loan.cantidadPrestada - loan.abonado)
      totalGanar = totalGanar - ((loan.plazos * loan.monto - loan.cantidadPrestada))
    }else{
      totalGanar = totalGanar - (loan.plazos * loan.monto - loan.abonado)
    }

    await updateDoc(userDoc,{
      total: totalGanar + totalRecuperar,
      totalGanar,
      totalRecuperar
    })

    const res = await deleteDoc(loanDoc)

    return res;
 
  } catch (error) {
    console.error(error);
    return null;
  }
}