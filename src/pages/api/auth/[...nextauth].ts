import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signin, signup } from '../../../backend/auth';
import { SessionStrategy } from 'next-auth';

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

      async authorize(credentials, req) {
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
        role: { label: 'Role', type: 'text' },
      },

      async authorize(credentials, req) {
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
  },
};

export default NextAuth(authOptions);
