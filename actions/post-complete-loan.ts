import firebase_app from "@/firebase/config";
import { Loan } from "@/interfaces/loans";
import { UserLoan } from "@/interfaces/userLoan";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const postCompleteLoan = async (data: {
  loan: Loan;
  user_id: string;
}) => {
  const db = getFirestore(firebase_app);

  try {
    let totals: UserLoan;
    const loanDoc = doc(
      db,
      `usuarios/${data.user_id}/completados/${data.loan.id}`
    );
    const possibleDoc = await getDoc(loanDoc);

    if (possibleDoc.exists()) {
      throw new Error("El prestamo ya está completado");
    }

    const userDoc = doc(db, `usuarios/${data.user_id}`);

    const resTotal = await getDoc(userDoc);
    if (!resTotal.exists()) {
      throw new Error("No existe el usuario");
    }
    totals = resTotal.data() as UserLoan;

    const res = await setDoc(
      loanDoc,
      data.loan
    );

    const rendimeintos =
      data.loan.plazos * data.loan.monto - data.loan.cantidadPrestada;
    await updateDoc(userDoc, {
      totalCompletado: totals.totalCompletado + rendimeintos,
    });
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};
