import firebase_app from "@/firebase/config";
import { UserLoan } from "@/interfaces/userLoan";
import { getUser } from "@/lib/utilsServer";
import {
  doc,
  getFirestore,
  getDoc} from "firebase/firestore";

export const getStats = async () => {
  const db = getFirestore(firebase_app); 
  const user = getUser()
  try {
    let totals:UserLoan;

    const userDoc = doc(db, `usuarios/${user?.user_id}`);

    const resTotal = await getDoc(userDoc)
    if(!resTotal.exists()){
      throw new Error("No existe el usuario")
    }
    totals = resTotal.data() as UserLoan;    

   return totals;
    
  } catch (error) {
    console.error(error);
    throw new Error("Error al ontener estadisticas");
  }
};
