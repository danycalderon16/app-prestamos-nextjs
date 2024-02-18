import firebase_app from "@/firebase/config";
import { Loan } from "@/interfaces";
import { getUser } from "@/lib/utilsServer";
import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getLoan = async (loanId:string) => {
  try {
    const db = getFirestore(firebase_app)
    const user = getUser()
    
    const data = await getDoc(doc(db,`usuarios/${user?.user_id}/prestamos/${loanId}`));
    const loan = data.data() as Loan;

    return loan;
  } catch (error) {
    console.error(error);
    return null;
  }
}