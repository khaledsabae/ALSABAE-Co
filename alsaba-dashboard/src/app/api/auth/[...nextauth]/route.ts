import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { readSheetData } from '@/lib/sheets-database';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const users = await readSheetData('Users', 'A:C'); // Assuming Users sheet with Email in col A, Password in B, Role in C
        if (!users) {
          return null;
        }

        const user = users.find(u => u[0] === credentials.email && u[1] === credentials.password);

        if (user) {
          return {
            id: user[0], // or a unique ID if you have one
            email: user[0],
            name: user[0], // or a name column if you have one
            role: user[2]
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login' // A custom login page if you have one
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };