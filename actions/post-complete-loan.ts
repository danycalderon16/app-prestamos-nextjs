import firebase_app from "@/firebase/config";
import { CompletedLoan } from "@/interfaces";
import { UserLoan } from "@/interfaces/userLoan";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const postCompleteLoan = async (data: {
  completedLoan: CompletedLoan;
  user_id: string;
}) => {
  const db = getFirestore(firebase_app);

  console.log({data});
  
  try {
    let totals: UserLoan;
    const loanDoc = doc(db,`usuarios/${data.user_id}/completados/${data.completedLoan.id}` );
    const userDoc = doc(db, `usuarios/${data.user_id}`);

    const possibleDoc = await getDoc(loanDoc);

    if (possibleDoc.exists()) {
      throw new Error("El prestamo ya está completado");
    }

    const resTotal = await getDoc(userDoc);
    if (!resTotal.exists()) {
      throw new Error("No existe el usuario");
    }
    totals = resTotal.data() as UserLoan;

    const res = await setDoc(
      loanDoc,
      data.completedLoan
    );

    const rendimeintos = data.completedLoan.cantidadPrestada;
    await updateDoc(userDoc, {
      totalCompletado: totals.totalCompletado + rendimeintos,
    });
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};
