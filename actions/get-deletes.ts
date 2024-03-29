import firebase_app from "@/firebase/config";
import { Loan } from "@/interfaces";
import { getUser } from "@/lib/utilsServer";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export const getDeletes = async () => {
  try {
    const db = getFirestore(firebase_app)
    const user = getUser()
    
    const data = await getDocs(collection(db,`usuarios/${user?.user_id}/eliminados`));
    const deletes: Loan[] = data.docs.map((doc) => {
      const loanData = doc.data() as Loan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
      return loanData;
    });

    return deletes;
  } catch (error) {
    console.error(error);
    
  }
}