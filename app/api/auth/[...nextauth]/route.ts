import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";

export const OPTIONS: NextAuthOptions = {
  providers: [
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
})
]
}

const hanlder = NextAuth(OPTIONS);

export { hanlder as GET, hanlder as POST }