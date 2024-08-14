import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (req: any, res: Response): Promise<void> => {
  const { conversationId, receiverId,text } = req.body;
  const senderId = req.user.id;

  try {
    const newMessage = await prisma.message.create({
      data: {
        conversationId: conversationId,
        senderId: senderId,
        receiverId: receiverId,
        text: text
      }
  });  
  
  res.status(201).json({ message: 'New message created!', createdMessage: newMessage });
  } catch (error) {
    res.status(201).json({ message: 'Something went wrong', error });
  }
};


export const fetchAllMessages = async (req: any, res: Response): Promise<void> => {

  try {
      const messages = await prisma.message.findMany({
        where:{
          conversationId: parseInt(req.params.id)
        }
      });      

      res.status(201).json({ message: 'messages have been fetched successfully', messages });

  } catch (error) {
      res.status(201).json({ message: 'Something went wrong', error });
  }

};
