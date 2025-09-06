import React from 'react'
import { TbApiApp, TbBell, TbFriends, TbHomeBitcoin } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import bg1 from "../assets/bg1.png"
import { useAuth } from '../AuthContext'
import { useTheme } from '../ThemeContext'

const Sidebar = () => {
  const{theme}=useTheme();
    const{authuser}=useAuth();
    const location=useLocation();
    const currentpath=location.pathname;
  return (
    <aside className='w-64 text-primary min-h-screen hidden lg:flex flex-col sticky-top-0 p-5' data-theme={theme}>
      <Link to ="/"><div className="flex justify-start  mb-8 w-full ">
                  <TbApiApp className="size-9 text-primary" /> 
                  <span className="  font-mono font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">TalkNest</span>
              </div>
              </Link>

              <nav className="flex flex-col gap-5  ">
               <Link to ="/" className={`flex justify-start w-full btn btn-ghost  ${currentpath=="/"?"btn-active":""}`}><TbHomeBitcoin size="20"/><span>home</span></Link>
                
                <Link to="/notifications"  className={`flex justify-start w-full btn btn-ghost  ${currentpath=="/notifications"?"btn-active":""}`}><TbBell  size="20"/> <span>Notifications</span></Link>
              </nav>
<div className='h-full flex flex-col '>
              <div className='flex items-baseline-last flex-1  gap-3 text-sm text-gray-300'>
                <div className='rounded-full h-[40px] w-[50px]'>
                    <img src={`${authuser.avatar}`} className=' object-fill'/>
                </div>
                <div className='w-full flex flex-col flex-1'>
                    <p className='text-primary'>{authuser.fullname}</p>
                    <div className=' flex text-primary font-semibold gap-1 items-center'>
                        <div className='rounded-full bg-primary  font-bold size-1'></div><span>online</span></div>
               </div>
              </div>
              </div>

   
    </aside>
  )
}

export default Sidebar
