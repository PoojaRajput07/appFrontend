import { MdOutlineVideoCall } from "react-icons/md";
import React from 'react'

const CallButton = ({handleVedioCall}) => {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full
    absolute top-0">
        <button onClick={handleVedioCall} className="btn btn-success btn-sm text-white">
            <MdOutlineVideoCall  className="size-6"/>
        </button>
      
    </div>
  )
}

export default CallButton
