export type User={
    id: number;
    username: string;
    password?: string;
    avatar?: string;
}

export type Conversation={
    id: number, 
    firstUserId: number, 
    secondUserId: number 
}

export type Message={
    id: number, 
    conversationId: number, 
    senderId: number, 
    receiverId: number, 
    text: string,
    createdAt: Date
}