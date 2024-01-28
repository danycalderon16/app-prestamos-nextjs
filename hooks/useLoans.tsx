import { Loan } from '@/interfaces/loans';
import { collection, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { useFirestore } from 'reactfire';


export async function useLoans(){
  const session = await getServerSession()

  const collectionRef = collection(useFirestore(),`usuarios/${session}/prestamos`);
  
  const data = await getDocs(collectionRef);

  const loans: Loan[] = data.docs.map((doc) => {
    const loanData = doc.data() as Loan; // Asegúrate de que los datos del documento coincidan con la interfaz Loan
    return loanData;
  });

  return {
    loans
  }
}
