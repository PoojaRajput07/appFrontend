import React from 'react'

import { AiOutlineLoading3Quarters } from "react-icons/ai"

const ChatLoader = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center p-4'>
        <AiOutlineLoading3Quarters className='animate-spin size-10 text-primary'/>
        <p className='mt-4 text-center text-lg font-mono'>connecting to chat ....</p>
      
    </div>
  )
}

export default ChatLoader
