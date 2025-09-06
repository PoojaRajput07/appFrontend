import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext"
import { TbApiApp, TbBell } from "react-icons/tb";
import { IoIosColorPalette, IoIosLogOut } from "react-icons/io";
import { doLogout } from "../Axios";
import toast from "react-hot-toast";
import { useTheme } from "../ThemeContext";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";
import { THEMES } from "../constant/constant";


const NavBar = () => {
    const[open,setOpen]=useState(false)
    const{theme,setTheme}=useTheme();
    const{authuser,setAuthuser}=useAuth();
    const location=useLocation();
    const ischatpage=location.pathname.startsWith("/chat");
   
    const handleLogout=async()=>{
        alert("btn is clicked");
        try {
            const res= await doLogout()
            console.log(res);
            toast.success("logout successfully");
            setAuthuser(null);
            console.log(authuser);
            
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);

            
        }
    }
    
  return (
    <div className="h-16  shadow flex items-center justify-baseline px-4 text-primary" data-theme={theme}>
        
        {ischatpage?
        <div className="flex flex-start ">
            <div className="flex justify-start gap-5 mb-4 items-center">
                        
                        <span className="font-mono font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">TalkNest</span>
                    </div>

        </div>
       :""}

        <div className="w-full h-full flex justify-end items-center" >

            <nav className="flex justify-end items-center gap-3">
                <Link to="/notifications" >
                <button className="btn btn-ghost btn-circle">  <TbBell className="size-6"/></button>
               
                </Link>
                <ThemeSelector/>
                  
                  <img src={`${authuser.avatar}`}className="size-10 rounded-full"/>
                  <button onClick={handleLogout} ><IoIosLogOut className="size-6" /></button>
            </nav>
           
        </div>


      
    </div>
  )
}

export default NavBar
