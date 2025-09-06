import { useState } from "react"
import { doSignUp, loggedUserInfo } from "../Axios"
import toast, {  Toaster } from "react-hot-toast";
import { TbApiApp } from "react-icons/tb";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.png"
import { useAuth } from "../AuthContext";

export const Signup=()=>{
    const{setAuthuser}=useAuth();
     const navigate=useNavigate();
     const [error,setError]=useState(null);
    const[data,setData]=useState({
        fullname:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setData((prev)=>({
            ...prev,[name]:value

        }))

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
      

        try {
            const res=await doSignUp(data)
            console.log(res);
            localStorage.setItem("token", res.data.token);
            
            setAuthuser(res.data.user);
           
            console.log("authuser",res.data.user);
             toast.success("signup successfull")
             navigate("/onboard");
             
   
        } catch (error) {
           
           setError(error.response?.data?.message);
            console.log(error);
            console.log("error signup ",error.message)
            
        }
        
       
    }
   
    return(
        <>
      
        <div className="h-screen flex  items-center p-4 sm:p-6 md:p-8" data-theme="forest" >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
        {/* //logo */}
        <div className="flex justify-start gap-0 mb-4 items-center">
            <TbApiApp className="size-9 text-primary" /> 
            <span className="font-mono font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">TalkNest</span>
        </div>
        {/* error */}
        {error?<div className="p-4 mb-2 rounded-lg font-semibold  bg-red-700"><p>{error}</p></div>:""}
    
        <div className="w-full ">
        <form onSubmit={handleSubmit} >
            <div className="space-y-6">
                <div>
                    <h2 className=" font-semibold text-xl " >Create an account</h2>
                    <p className="opacity-70 text-sm ">join streamify now </p>
                </div>
                 <div className="space-y-3">
                <div className="w-full form-control flex flex-col ">
                   <label htmlFor="fullname" className="p-1 font-bold text-md">Fullname</label>
                <input 
                id="fullname"
                type="text"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            placeholder="enter your full name"
            className="mb-3 border-1 border-gray-400  rounded-full p-2"
            required />
             <label htmlFor="Email" className="p-1 font-bold text-md">Email</label>
            <input type="email"
            id="Email"
            name="email"
            placeholder="enter your email"
            value={data.email}
            onChange={handleChange}
            className="mb-3 border-1 border-gray-400  rounded-full p-2"
            required/>

            <label htmlFor="password" className="p-1 font-bold text-md">Password</label>
            <input 
            id="password"
            type="password"
            name="password"
            placeholder="enter your password"
            value={data.password}
             className="mb-3 border-1 border-gray-400  rounded-full p-2"
            onChange={handleChange} />
<div className="flex">
            <input type="checkbox" required className="m-3"/>
            <p className="m-3 ml-0">I agree to the <span className="font-semibold text-green-800">terms of service </span>and  <span className=" font-semibold text-green-900">privacy policy</span> </p>
            </div>
           


         
            <button className="bg-green-800 rounded-full p-2 text-white">submit</button>
            <div className="m-3 flex items-center justify-center ">
           <p >Already have an account <span className="text-green-800 font-bold"><NavLink to="/login">Sign in</NavLink> </span></p>
           </div>
          

                </div>
            </div>
            </div>
           
            
        </form>
        </div>

        </div>
        
       {/* images */}
       <div className="lg:w-1/2 flex flex-col items-center ">
        <img src={bg1} alt=""  className="w-[400px] h-[400px] object-cover "/>
        <div className="flex  flex-col flex-wrap justify-center items-center  w-[300px]">
            <p className="align-center font-semibold text-lg mb-2">connect with language partners worldwide </p>
            <p className="text-gray-400">practice conversations,make friends and improve your language skills together </p>
        </div>
       </div>
        </div>
        
        
       
        </div>

        
        </>
    )
}
