
import firebase_app from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import { redirect } from 'next/navigation';
export default function MainPage() {

    redirect("loans")
  
}
