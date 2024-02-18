import firebase_app from "@/firebase/config";
import { Payment } from "@/interfaces";
import { getFirestore, doc, collection, getDocs, deleteDoc } from "firebase/firestore";

export const deleteDeleted = async (loanId:string,userId:string) => {
  try {
    const db = getFirestore(firebase_app)

    const path = `usuarios/${userId}/eliminados/${loanId}`

    const loanDoc = (doc(db,`${path}`));

    getDocs(collection(db,`${path}/abonos`)).then((res:any)=>{
      res.docs.map((pay:any)=>{
        const payment = pay.data() as Payment;
        deleteDoc(doc(db,`${path}/abonos/${payment.id}`));
      })
    })

    const res = await deleteDoc(loanDoc)

    return res;
 
  } catch (error) {
    console.error(error);
    return null;
  }
}