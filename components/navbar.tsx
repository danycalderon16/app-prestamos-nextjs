"use client"
import { UserAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const {user, logOut} = UserAuth()

  return (
    <div className='flex justify-between bg-white p-3'>
      <h2>App Prestamos</h2>
      <div className="flex justify-between gap-2">
      <h3>{user?.displayName}</h3>
      <button className={`text-gray-900 
      bg-white border 
      border-gray-300 
      focus:outline-none 
      hover:bg-gray-100 
      focus:ring-4 
      focus:ring-gray-200 
      font-medium rounded-lg 
      text-sm px-5 
      py-2.5 me-2 mb-2 
      dark:bg-gray-800 
      dark:text-white 
      dark:border-gray-600 
      dark:hover:bg-gray-700 
      dark:hover:border-gray-600 
      dark:focus:ring-gray-700`}
      onClick={logOut}>Salir</button>
      </div>
    </div>
  )
}

export default Navbar