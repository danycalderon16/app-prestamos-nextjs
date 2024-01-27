import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientSideProviders from "@/providers/ClientSideProviders";
import FirestoreProvider from "@/providers/FirestoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App de prestamos",
  description: "App de prestamos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSideProviders>
          <FirestoreProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </FirestoreProvider>
        </ClientSideProviders>
      </body>
    </html>
  );
}
