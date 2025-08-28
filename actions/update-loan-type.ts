import firebase_app from "@/firebase/config";
import { CompletedLoan, Loan } from "@/interfaces";
import {
    doc,
    getFirestore,
    setDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

export const updateLoanTipe = async (data: {
    loan_id: number,
    user_id: string;
}) => {
    const db = getFirestore(firebase_app);
    console.log(data.loan_id)
    try {
        const path = `usuarios/${data.user_id}`;
        const loanDoc = doc(db, `${path}/prestamos/${data.loan_id}`);

        const loan = (await getDoc(loanDoc)).data() as Loan;
    
        const new_type:Loan["tipo"] = loan.tipo === "Quincenal" ? "Semanal" : "Quincenal";

        await updateDoc(loanDoc, {
            tipo: new_type,
        });
    } catch (error) {
        console.error(error);
        throw new Error("No se pudo actualizar el tipo de prestamo");
    }
};
