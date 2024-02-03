import { Loan } from '@/interfaces/loans';
import { getUser } from '@/lib/utilsServer';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from 'reactfire';


export async function useLoans(){
  const user = getUser();

  const collectionRef = collection(useFirestore(),`usuarios/${user?.user_id}/prestamos`);
  
  const data = await getDocs(collectionRef);

  const loans: Loan[] = data.docs.map((doc) => {
    const loanData = doc.data() as Loan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
    return loanData;
  });

  return {
    loans
  }
}
