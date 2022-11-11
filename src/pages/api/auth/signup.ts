import type { NextApiRequest, NextApiResponse } from 'next';
import { bcrypt } from 'bcrypt';
import prisma from '../../../backend/utils/prismadb';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(_req.body.email && _req.body.password && _req.body.name)) {
    return res.status(400).send({ error: 'Data not formatted properly' });
  }

  const user = prisma.user.findUnique({
    where: {
      email: _req.body.email,
    },
  });

  if (user !== null)
    return res.status(400).json({ message: 'User already exists' });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(_req.body.password, salt);

  const newUser = prisma.user.create({
    data: {
      name: _req.body.name,
      email: _req.body.email,
      password: hashedPassword,
      role: 'STUDENT',
    },
  });

  return res
    .status(200)
    .json({ message: 'User created successfully', user: newUser });
}
