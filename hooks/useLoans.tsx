import { Loan } from '@/interfaces/loans';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

export async function useLoans({uid}:{uid:string|undefined}){
  const collectionRef = collection(useFirestore(),`usuarios/${uid}/prestamos`);
  
  const data = await getDocs(collectionRef);

  const loans: Loan[] = data.docs.map((doc) => {
    const loanData = doc.data() as Loan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
    return loanData;
  });

  return {
    loans
  }
}
