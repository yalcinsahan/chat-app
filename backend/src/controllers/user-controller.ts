import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response): Promise<void> => {

  console.log(req.body);
  

    try {
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
          },
        });
    
        res.send(user);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
      }
};

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      }
};