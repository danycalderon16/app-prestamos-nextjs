import firebase_app from "@/firebase/config";
import { CompletedLoan, UserLoan } from "@/interfaces";
import { getFirestore, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const deleteCompleted = async (loanId:string,userId:string) => {
  try {
    const db = getFirestore(firebase_app)

    const path = `usuarios/${userId}/completados/${loanId}`

    const completedDoc = (doc(db,`${path}`));

    const data = await getDoc(completedDoc);
    const completedLoan = data.data() as CompletedLoan;

    let stats:UserLoan;

    const userDoc = doc(db, `usuarios/${userId}`);

    const resStats = await getDoc(userDoc)
    if(!resStats.exists()){
      throw new Error("No existe el usuario")
    }
    stats = resStats.data() as UserLoan;    

    await updateDoc(userDoc,{
      totalCompletado: stats.totalCompletado - completedLoan.ganancia
    })

    const res = await deleteDoc(completedDoc)

    return res;
 
  } catch (error) {
    console.error(error);
    return null;
  }
}