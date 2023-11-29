'use client'

import { useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

export default function Chat() {

  const [conversation, setConversation] = useState<{ id: number, firstUserId: number, secondUserId: number }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{id: 0, conversationId: 0, receiverId: 0, text: "" }]);


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

        const response = await fetch('http://localhost:8000/message/get/' + conversationId, {
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

        const response = await fetch('http://localhost:8000/conversation/get', {
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

      const response = await fetch('http://localhost:8000/message/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token in the Authorization header
        },
        body: JSON.stringify({ conversationId: conversation?.id, receiverId: parseInt(userId!), text: message }),
      });


      if (response.ok) {
        const data = await response.json();
        // Handle successful response

        setMessages(prevMessages => [...prevMessages,data.createdMessage]);
      
        socket.emit('privateMessage', { sender: token, receiver:userId, message: data.createdMessage});

        setMessage('');

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
  
    const handlePrivateMessage = ({ sender, message }: { sender: string; message: any }) => {
      console.log("sender and message: ", sender, message);
      
     setMessages(prevMessages => [...prevMessages,message]);
    };
  
    socket.on('privateMessage', handlePrivateMessage);
  
    return () => {
      socket.off('privateMessage', handlePrivateMessage); // Clean up the event listener when component unmounts
    };
  }, []);


  return (
    <div className="bg-blue-100 pt-6 rounded-lg shadow-md relative h-screen overflow-y-scroll">
      <div className="mb-4 px-6">
        {messages?.map((message) => (
          <div key={message.id} className={message.receiverId !== parseInt(userId!) ? "bg-white p-3 rounded-md shadow-md mb-2 w-full max-w-2xl" : "bg-pink-500 p-3 rounded-md shadow-md mb-2 w-full max-w-2xl ml-auto"}>
            <p className="text-gray-800 ">{message.text}</p>
          </div>
        ))}
      </div>

      <div className='bottom-0 left-0 w-full sticky bg-blue-100 p-6'>
        <form onSubmit={(e)=>sendMessage(e)} className='flex items-center'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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

  )
}