"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import LoansContextProvider from "@/context/LoansContext";
import NotificationsContextProvider from "@/context/NotificationContext";
import { firebaseConfig } from "@/firebase/config";
// import { SessionProvider } from "next-auth/react";
import { FirebaseAppProvider } from "reactfire";

export default function ClientSideProviders({
  children,
}: React.PropsWithChildren) {
  return (
    // <SessionProvider>
    <AuthContextProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <NotificationsContextProvider>
          <LoansContextProvider>{children}</LoansContextProvider>
        </NotificationsContextProvider>
      </FirebaseAppProvider>
    </AuthContextProvider>
    // </SessionProvider>
  );
}
