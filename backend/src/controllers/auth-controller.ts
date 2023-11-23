import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {

  const { username, password } = req.body;

  const checkCredentials = await prisma.user.findUnique({
    where: {
      username: username,
      password: password
    },
  });

  if (checkCredentials) {
    const token = jwt.sign({ username }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }

};

export const signup = async (req: Request, res: Response): Promise<any> => {

  const { username, password }: User = req.body;

  // Check if username already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    })

    res.json({ message: 'Signup successful',user });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }

};
