import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { bcrypt } from 'bcrypt';
import prisma from '../../../backend/utils/prismadb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (credentials === undefined) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user === null) return null;

        const isValid = await bcrypt.compare(
          user.password,
          credentials.password
        );

        if (isValid) return { id: user.id, name: user.name, email: user.email };

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);