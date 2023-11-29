'use client'

import { useEffect, useState } from "react"
import Link from "next/link";

export default function Leftbar() {


    const [users, setUsers] = useState<{id:number, username:string}[]>()

    useEffect(() => {

      const fetchUsers = async () => {
        const res = await fetch('http://localhost:8000/user/all')
        const {users} = await res.json();
        setUsers(users);
      }
  
      fetchUsers()
      
    }, [])


    return (
      <div className="bg-gray-100 p-4 border-r border-gray-300 h-screen">
      {users?.map(user => (
        <Link
          key={user.username}
          className="block text-gray-800 hover:text-blue-500 mb-2"
          href={{ pathname: '/chat', query: { userId: user.id } }}
        >
          {user.username}
        </Link>
      ))}
    </div>
    
    )
  }

/*'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

export default function Leftbar() {

    const router = useRouter()

    const [users, setUsers] = useState<{id:number, username:string}[]>()

    useEffect(() => {

      const fetchUsers = async () => {
        const res = await fetch('http://localhost:8000/user/all')
        const {users} = await res.json();
        setUsers(users);
      }
  
      fetchUsers()
      
    }, [])

    const goToChat= async (userId:number) => {
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
          body: JSON.stringify({ firstUserId: userId}),
        });
    
        if (response.ok) {
          const data = await response.json();
          // Handle successful response
          console.log('Data:', data);

          router.push(`/chat/${data.conversation.id}`)
        } else {
          // Handle error response (e.g., unauthorized access)
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
      }
    }

    return (
      <div className="flex-[1] bg-pink-300">
        {users?.map(user=>{
          return (
            <div key={user.username} className="cursor-pointer" onClick={()=>goToChat(user.id)}>
              {user.username}
            </div>
          )
        })}
      </div>
    )
  }
*/