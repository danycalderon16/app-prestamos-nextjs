'use client';

import { getFirestore } from "firebase/firestore";
import { FirestoreProvider as FirestoreAppProvider, useFirebaseApp } from "reactfire";

export default function FirestoreProvider({children}:React.PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp())
  return (
    <FirestoreAppProvider sdk={firestoreInstance}>
      {children}
    </FirestoreAppProvider>
  );
}