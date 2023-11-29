import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchAllUsers = async (req: any, res: Response): Promise<void> => {

    try {
        const users = await prisma.user.findMany({});
        res.status(201).json({ message: 'users have been fetched successfully', users });

    } catch (error) {
        res.status(201).json({ message: 'Something went wrong', error });
    }

};
