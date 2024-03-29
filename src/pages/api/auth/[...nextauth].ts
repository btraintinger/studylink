/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { SessionStrategy } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signin, signup } from '../../../backend/auth';

export const authOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  providers: [
    CredentialsProvider({
      id: 'signin',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials) {
        try {
          return await signin(credentials);
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    CredentialsProvider({
      id: 'signup',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials) {
        try {
          return await signup(credentials);
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
