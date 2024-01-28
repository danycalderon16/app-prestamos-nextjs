import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";

export const OPTIONS: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),               
  ],
  callbacks: {
    session: async ({ session, token }) => {
      
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token, account }) => {
      // console.log({user, token, account});
      if(account){
        console.log(account);
        
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const hanlder = NextAuth(OPTIONS);

export { hanlder as GET, hanlder as POST };
