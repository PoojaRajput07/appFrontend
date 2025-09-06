import React, { useState } from 'react'
import { doLogin } from '../Axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import OnBoard from './OnBoard'
import bg1 from "../assets/bg1.png"
import { useAuth } from '../AuthContext'


const Login = () => {
  const{setAuthuser,authuser}=useAuth();
  const [data,setData]=useState({
  email:"",
  password:""
})
const navigate =useNavigate()
const handleChange=(e)=>{
  const{ name,value }=e.target
  setData((prev)=>({
    ...prev,[name]:value
  }))

}
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const res=await doLogin(data);
    console.log(res.data.user);
    setAuthuser(res.data.user);
    toast.success("logged in !")
    

    navigate("/onboard");
    
  } catch (error) {
    console.log(error);
    toast.error("no user exist!")
    
  }

}
  return (
    <>
    <Toaster/>
    <div className='w-full min-h-screen flex justify-center ' data-theme="forest" >
      <div className='m-8 w-full flex flex-col justify-center items-center'>
        <div className='font-mono font-bold text-5xl m-3'>
          <h1>login</h1>
        </div>
        <div className=' flex justify-center items-center rounded-2xl w-[900px] p-5' data-theme="forest">
      
      <div className='w-full  rounded-lg  border border-primary/32 flex m-5   '>
      <div className='w-1/2  flex flex-col '>
      <div className='flex flex-col items-start p-8 gap-3 w-full'>
        <h1  className='font-mono font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>TalkNest</h1>
        <h2 className='font-bold text-lg '>welcome back</h2>
        <p className='text-gray-400'>sign in to your account to continue your language journey</p>
<div className='w-full flex flex-col '>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex flex-col gap-2 mb-4 w-full'>
            <label htmlFor="email" className='font-semibold'> email</label>
            <input type="email"
            placeholder="enter your email"
            required 
            onChange={handleChange}
            value={data.email}
            name="email"
            id="email"
            className='w-full rounded-sm border-2 border-primary/25 p-2'/>
          </div>


          <div className='flex flex-col gap-2 mb-4'>
            <label htmlFor="password" className='font-semibold'> password</label>
            <input type="password"
            placeholder="enter your password"
            required 
            onChange={handleChange}
            value={data.password}
            name="password"
            id="password"
            className=' w-full rounded-sm border-2 border-primary/25 mb-3 p-2'/>


            <button className='w-full p-3 rounded-lg bg-primary/25 font-semibold font-mono text-lg'>signin</button>
          </div>
        </form>

        </div>
      </div>
      <div></div>

      </div>
      <div className='w-1/2 bg-primary/25'>
      <img src={bg1} className='object-cover height-[500px] width-[500px]'/>
      </div>
      </div>

      </div>
      </div>
      
    </div>
    </>
  )
}

export default Login
