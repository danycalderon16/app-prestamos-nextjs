import firebase_app from "@/firebase/config";
import { User } from "@/interfaces";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

export const verifyUser = async (dataUser: User) => {
  const db = getFirestore(firebase_app);

  const userDoc = doc(db, `usuarios/${dataUser.user_id}`);

  const resUser = await getDoc(userDoc);
  if (!resUser.exists()) {
    setDoc(userDoc, {
      email: dataUser.email,
      id: dataUser.user_id,
      nombre: dataUser.name,
      total: 0,
      totalCompletado: 0,
      totalGanar: 0,
      totalRecuperar: 0,
    }).catch((err) => {
      console.error(err);
      window.location.reload;
      throw new Error("Error al crear el usuario");
    });
  }
};
