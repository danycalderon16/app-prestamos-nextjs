'use client';

import { firebaseConfig } from "@/firebase/config";
import { FirebaseAppProvider } from "reactfire";

export default function FirebaseProvider({children}:React.PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {children}
    </FirebaseAppProvider>
  );
}