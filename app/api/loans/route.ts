import firebase_app, { firebaseConfig } from "@/firebase/config";
import { Loan } from "@/interfaces/loans";
import { getUser } from "@/lib/utilsServer";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { NextResponse } from "next/server"
// import { useFirestore } from "reactfire";

export async function GET(
  req:Request,
  {params}: {params: {uid:string}}
) {
  try {
    const db = getFirestore(firebase_app)
    const user = getUser()
    
    const data = await getDocs(collection(db,`usuarios/${user?.user_id}/prestamos`));
    const loans: Loan[] = data.docs.map((doc) => {
      const loanData = doc.data() as Loan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
      return loanData;
    });    

    return NextResponse.json(loans);

  } catch (error) {
    console.error("[FIRESTORE_GET]",error)
    return new NextResponse("Internal server error",{status:500})
  }
  
}