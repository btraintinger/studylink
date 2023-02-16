import bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';
import prisma from '../utils/prismadb';
import jwt from 'jsonwebtoken';
import { sendEmailVerificationEmail } from './sendEmailVerificationEmail';
import { User } from '@prisma/client';

async function isUserAlreadyExistent(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailVerified: true },
  });

  return !!user?.emailVerified;
}

function areCredentialsValid(credentials) {
  return (
    isEmail(credentials.email) &&
    credentials.password.length > 0 &&
    credentials.name.length > 0
  );
}

export async function signin(credentials) {
  if (credentials === undefined) throw new Error('Invalid credentials');

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (user === null) throw new Error('Benutzer existiert nicht');

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (user.role === 'ADMIN' && !user.emailVerified) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set');

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '15min',
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: token,
      },
    });
    sendEmailVerificationEmail(token, user.email);
    throw new Error('Verifiziere deine Email über den zugesandten Link');
  }

  if (isValid) return user;

  throw new Error('Falsche email order falsches Password');
}

export async function signup(credentials) {
  if (credentials === undefined) throw new Error('Invalid credentials');

  if (!areCredentialsValid(credentials)) throw new Error('Invalid credentials');

  // hash and salt password with bcrypt
  const hashedPassword = await bcrypt.hash(credentials.password, 10);

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: { emailVerified: true, role: true },
  });

  if (user?.emailVerified || user?.role === 'STUDENT')
    throw new Error('Benutzer existiert bereits');

  let newUser: User | null = null;
  if (user)
    newUser = await prisma.user.update({
      where: { email: credentials.email },
      data: {
        password: hashedPassword,
        name: credentials.name,
      },
    });
  else {
    newUser = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        name: credentials.name,
        role: 'ADMIN',
      },
    });
    if (newUser === null)
      throw new Error('Benutzter konnte nicht erstellt werden');

    const admin = await prisma.admin.create({
      data: {
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    if (admin === null) {
      await prisma.user.delete({
        where: {
          id: newUser.id,
        },
      });
      throw new Error('Benutzter konnte nicht erstellt werden');
    }
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');

  const token = jwt.sign({ id: newUser.id }, secret, {
    expiresIn: '15min',
  });

  await prisma.user.update({
    where: { id: newUser.id },
    data: {
      emailVerificationToken: token,
    },
  });
  sendEmailVerificationEmail(token, newUser.email);

  throw new Error('EmailVerificationNeeded');
}
