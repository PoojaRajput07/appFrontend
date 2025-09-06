import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Header = () => {
  return (
    <div>
        <h1>Header
</h1>
<button onClick={()=>toast.success("good job")}>success</button>
        <Toaster/>
    </div>
  
  )
}

export default Header
