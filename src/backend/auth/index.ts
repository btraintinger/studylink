import bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';
import prisma from '../utils/prismadb';

async function isUserAlreadyExistent(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return !!user;
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

  if (isValid) return user;

  throw new Error('Falsche email order falsches Password');
}

export async function signup(credentials) {
  if (credentials === undefined) throw new Error('Invalid credentials');

  if (!areCredentialsValid(credentials)) throw new Error('Invalid credentials');
  if (await isUserAlreadyExistent(credentials.email))
    throw new Error('User existiert bereits');

  // hash and salt password with bcrypt
  const hashedPassword = await bcrypt.hash(credentials.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: credentials.name,
      email: credentials.email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  if (newUser === null) throw new Error('User konnte nicht erstellt werden');

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
    throw new Error('User konnte nicht erstellt werden');
  }

  return newUser;
}
