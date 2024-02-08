import firebase_app from "@/firebase/config";
import { Payment } from "@/interfaces";
import { getUser } from "@/lib/utilsServer";
import { getFirestore, getDocs, collection } from "firebase/firestore";

export const getPayments = async (loanId:string) => {
  try {
    const db = getFirestore(firebase_app)
    const user = getUser()
    
    const data = await getDocs(collection(db,`usuarios/${user?.user_id}/prestamos/${loanId}/abonos`));
    const payments: Payment[] = data.docs.map(doc=>{
      const paymentData = doc.data() as Payment
      return paymentData; 
    });
    return payments;
  } catch (error) {
    console.error(error);
    
  }
}

