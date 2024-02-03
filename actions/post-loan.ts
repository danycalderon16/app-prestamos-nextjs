import firebase_app from "@/firebase/config";
import { Loan } from "@/interfaces/loans";
import {
  Transaction,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export const postLoan = async (data: { loan: Loan; user_id: string }) => {
  const db = getFirestore(firebase_app);

  const loanPost = data.loan
  const res = await setDoc(
    doc(db, `usuarios/${data.user_id}/prestamos/${generateID()}`),
    {  ...loanPost}
  );

  console.log(res);
};

function generateID(): string {
  let date = new Date();
  console.log(date.getDate());
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  month = Number(month) < 10 ? `0${month}` : month;
  let day = date.getDate().toString();
  day = Number(day) < 10 ? `0${day}` : day;
  const random = Math.ceil(Math.random() * 9);
  return year + month + day + random;
}
