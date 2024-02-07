import { FileX2 } from 'lucide-react'
import React from 'react'

interface Props {
  text:string
}

export const NotFuound = ({text}:Props) => {
  return (
    <div className='flex flex-col justify-center items-center h-[400px]'>
      <FileX2 className='text-gray-400' size={120}/>
      <p className='mt-4 text-gray-400'>{text}</p>
    </div>
  )
}
