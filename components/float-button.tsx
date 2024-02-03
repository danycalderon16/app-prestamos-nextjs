import { Plus } from 'lucide-react';
import React from 'react'

const  FloatButton= () => {
  return (
    <div className={`
    fixed
    z-90
    bottom-24
    md:bottom-6
    right-8
    w-[50px]
    h-[50px]
    bg-sky-500
    rounded-full
    drop-shadow-lg
    flex
    justify-center
    items-center
    cursor-pointer
    hover:drop-shadow-2xl
    hover:bg-sky-600
    duratio-300
    `}>
      <Plus className='text-white' size={40}/>
    </div>
  )
}

export default FloatButton;