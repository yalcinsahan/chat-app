'use client'

import { useEffect, useState } from "react"
import Link from "next/link";

import { User } from "../types/types";
import Image from "next/image";


export default function Leftbar() {

  const [loading,setLoading] = useState(true);
  const [hostUser, setHostUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('');


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


  useEffect(() => {

    if (search === '') {
      const fetchUsers = async () => {
        const res = await fetch(`${process.env.apiUrl}/user/all`)
        const { users } = await res.json();
        setUsers(users);

        setLoading(false);
      }

      fetchUsers()
    }
    else {
      const fetchBySearchText = async () => {
        const res = await fetch(`${process.env.apiUrl}/user/search/${search}`)
        const { users } = await res.json();
        setUsers(users);
      }

      fetchBySearchText()
    }


  }, [search])

  return (
    <div className="bg-gray-100 px-2 py-4 border-r border-gray-300 h-screen">

      {loading ?  (
        <div className="flex items-center">
          loading...
        </div>
      ):(
        <div>
        <div className="flex items-center">
        <div className='relative w-[70px] h-[70px] flex items-center'>
          <Image style={!hostUser?.avatar ? { padding: '4px' } : {}} className='rounded-full object-cover border-4 border-solid border-green-500' src={hostUser?.avatar ? hostUser?.avatar : "/profile.png"} fill={true} alt='profile' />
        </div>
        {hostUser ? (
          <h1 className="text-center text-2xl font-bold ml-4">{hostUser?.username}</h1>
        ) :(
          <div className="ml-4 flex">
            <Link href="/login" className="text-blue-500">login</Link>
            <span className="mx-1">or</span>
            <Link href="/signup" className="text-blue-500">signup</Link>
          </div>
        )}
      </div>

      <input
        placeholder="search..."
        className="mt-4 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none "
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-8">
        {users?.map(user => (
          user.username !== hostUser?.username && (
            <Link
              key={user.username}
              className="block text-gray-800 hover:text-blue-500 mb-2 py-2 hover:bg-gray-200"
              href={{ pathname: '/chat', query: { userId: user.id } }}
            >

              <div className="flex items-center">
                <div className='relative w-[50px] h-[50px] flex items-center justify-center'>
                  <Image style={!user?.avatar ? { padding: '4px' } : {}} className='rounded-full object-cover border-2 border-solid border-black' src={user?.avatar ? user?.avatar : "/profile.png"} fill={true} alt='profile' />
                </div>
                <span className="ml-2">{user.username}</span>
              </div>

            </Link>
          )
        ))}
      </div></div>
      )}
      
    </div>

  )
}

