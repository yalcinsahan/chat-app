'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation' 

const Signup = () => {

  const router = useRouter()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(response);
      

      if (response.ok) {
        // Handle successful signup, redirect or show success message
        setErrorMessage('');
        setSuccessMessage('Signup successful');
        // Redirect or show success message
        setTimeout(() => {
            router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto block"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="text-red-500 mb-4 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4 mt-2">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;