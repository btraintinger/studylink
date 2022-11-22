import bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

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

  const roles = ['ADMIN', 'STUDENT'];
  if (
    !isEmail(credentials.email) ||
    credentials.password.length < 1 ||
    credentials.name.length < 1 ||
    !roles.includes(credentials.role)
  ) {
    throw new Error('Invalid credentials');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (user !== null) throw new Error('User existiert bereits');

  // hash and salt password with bcrypt
  const hashedPassword = await bcrypt.hash(credentials.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: credentials.name,
      email: credentials.email,
      password: hashedPassword,
      role: credentials.role,
    },
  });
  return newUser;
}
