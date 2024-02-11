import firebase_app from "@/firebase/config";
import { UserLoan } from "@/interfaces/userLoan";
import {
  doc,
  getFirestore,
  getDoc} from "firebase/firestore";

export const getStats = async (user_id:string) => {
  const db = getFirestore(firebase_app); 
  // const user = getUser()
  try {
    let totals:UserLoan;
    console.log("hola");
    

    const userDoc = doc(db, `usuarios/${user_id}`);

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
