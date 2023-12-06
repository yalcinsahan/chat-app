'use client'

import { Conversation, Message, User } from '@/src/types/types';
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import io from 'socket.io-client';
const socket = io(`${process.env.apiUrl}`);

export default function Chat() {

  const bottomRef = useRef<HTMLDivElement>(null);

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [hostUser, setHostUser] = useState<User | null>(null);

  useEffect(() => {

    try {
      const userFromLocal = JSON.parse(localStorage.getItem('user') ?? '');

      if (userFromLocal.username) {
        setHostUser(userFromLocal);
      }
    } catch (error) {
      console.log(error);
    }

  }, [])

  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  useEffect(() => {

    const getMessages = async (conversationId: number) => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Make sure the token exists
        if (!token) {
          // Handle no token scenario
          return;
        }

        const response = await fetch(`${process.env.apiUrl}/message/get/` + conversationId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Handle successful response

          setMessages(data.messages);

        } else {
          // Handle error response (e.g., unauthorized access)
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
      }
    }

    const getChat = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Make sure the token exists
        if (!token) {
          // Handle no token scenario
          return;
        }

        const response = await fetch(`${process.env.apiUrl}/conversation/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach token in the Authorization header
          },
          body: JSON.stringify({ firstUserId: parseInt(userId!) }),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle successful response

          setConversation(data.conversation);

          getMessages(data.conversation.id);

        } else {
          // Handle error response (e.g., unauthorized access)
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
      }
    }

    getChat();
  }, [userId])


  const sendMessage = async (e: any) => {
    e.preventDefault();
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Make sure the token exists
      if (!token) {
        // Handle no token scenario
        return;
      }

      const response = await fetch(`${process.env.apiUrl}/message/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token in the Authorization header
        },
        body: JSON.stringify({ conversationId: conversation?.id, receiverId: parseInt(userId!), text: messageText }),
      });


      if (response.ok) {
        const data = await response.json();
        // Handle successful response     

        setMessages(prevMessages => messages ? [...prevMessages!, data.createdMessage] : [data.createdMessage]);

        socket.emit('privateMessage', { sender: token, receiver: userId, message: data.createdMessage });

        setMessageText('');

        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

      } else {
        // Handle error response (e.g., unauthorized access)
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Fetch Error:', error);
    }
  }

  useEffect(() => {
    const handleJoin = () => {
      const token = localStorage.getItem('token');
      socket.emit('join', token);
    };

    handleJoin();
  }, [])
  

  useEffect(() => {

    const handlePrivateMessage = ({ sender, message }: { sender: string; message: Message }) => {

      if (message.senderId.toString() == userId) {
        setMessages(messages ? [...messages, message] : [message]);
      }
    };

    socket.on('privateMessage', handlePrivateMessage);

    return () => {
      socket.off('privateMessage', handlePrivateMessage); // Clean up the event listener when component unmounts
    };
  }, [messages]);


  return (
    <div className="bg-blue-100 rounded-lg shadow-md relative h-screen overflow-y-scroll">
      {conversation?.id ? (
        <div>
          <div className="p-6 min-h-[90vh]">
            {messages?.map((message) => (
              <div key={message.id} className={message.receiverId !== parseInt(userId!) ? "mb-2 w-full max-w-2xl mr-auto flex justify-start" : " mb-2 w-full max-w-2xl ml-auto flex justify-end"}>
                <p className={message.receiverId !== parseInt(userId!) ? "text-gray-800 bg-white p-3 rounded-md shadow-md  inline" : "text-black bg-pink-300 p-3 rounded-md shadow-md inline"}>
                  {message.text}
                  <span className='block mt-2 ml-auto text-gray-600 text-sm w-full text-end'>
                    {moment(message.createdAt).startOf('hour').fromNow()}
                  </span>
                </p>

              </div>
            ))}
            <div ref={bottomRef} className='h-6' />
          </ div >

          <div className='bottom-0 left-0 w-full sticky bg-blue-100 p-6 h-[10vh]'>
            <form onSubmit={(e) => sendMessage(e)} className='flex items-center'>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="border border-gray-300 border-solid flex-1 rounded-l-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type='submit'
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md focus:outline-none"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>wait...</div>
      )}
    </div>

  )
}