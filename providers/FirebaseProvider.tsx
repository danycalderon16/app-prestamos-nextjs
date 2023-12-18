"use client";

import { firebaseConfig } from "@/firebase/config";
import { SessionProvider } from "next-auth/react";
import { FirebaseAppProvider } from "reactfire";

export default function FirebaseProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        {children}
      </FirebaseAppProvider>
    </SessionProvider>
  );
}
