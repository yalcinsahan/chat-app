import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchAllUsers = async (req: any, res: Response): Promise<void> => {

    try {
        const users = await prisma.user.findMany({ select: { id: true, username: true, avatar: true }});
        res.status(201).json({ message: 'users have been fetched successfully', users });

    } catch (error) {
        res.status(201).json({ message: 'Something went wrong', error });
    }

};

export const fetchUserByUsername = async (req: any, res: Response): Promise<void> => {

    const {searchText} = req.params;

    try {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: searchText, // Use 'contains' filter to check for text occurrence
          },
        },
        select: { id: true, username: true, avatar: true },
      });
      res.status(201).json({ message: 'users have been fetched successfully', users });
    } catch (error) {
      // Handle errors here
      res.status(201).json({ message: 'Something went wrong', error });
    }
  }
