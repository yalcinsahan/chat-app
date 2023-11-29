import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrCreate = async (req: any, res: Response): Promise<void> => {
    const { firstUserId } = req.body;
    const secondUserId  = req.user.id;

    const conversation = await prisma.conversation.findFirst({
        where: {
            OR: [
                {
                    firstUserId: firstUserId,
                    secondUserId: secondUserId
                },
                {
                    firstUserId: secondUserId,
                    secondUserId: firstUserId
                }
            ]
        },
    });

    // Use `conversation` to perform further actions or handle results
    // For example:
    if (conversation) {
        // Conversation already exists between the users
        res.status(200).json({ message: 'Conversation found!', conversation });
    } else {

        const newConversation = await prisma.conversation.create({
            data: {
                firstUserId: firstUserId,
                secondUserId: secondUserId
            }
        });

        res.status(201).json({ message: 'New conversation created!', conversation: newConversation });
    }
};
