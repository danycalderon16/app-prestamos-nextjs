import firebase_app from "@/firebase/config";
import { CompletedLoan } from "@/interfaces";
import { getUser } from "@/lib/utilsServer";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export const getCompleted = async () => {
  try {
    const db = getFirestore(firebase_app)
    const user = getUser()
    
    const data = await getDocs(collection(db,`usuarios/${user?.user_id}/completados`));
    const completedLoans: CompletedLoan[] = data.docs.map((doc) => {
      const completedLoanData = doc.data() as CompletedLoan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
      return completedLoanData;
    });

    return completedLoans;
  } catch (error) {
    console.error(error);
    
  }
}