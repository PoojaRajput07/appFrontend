import {  useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getonBoard } from "../Axios";
import { useAuth } from "../AuthContext";
import { LANGUAGES } from "../constant/constant";
import {useNavigate } from "react-router-dom";




 const OnBoard=()=>{

  const navigate=useNavigate();
  const{authuser,setAuthuser}=useAuth();
  const[avatar,setAvatar]=useState(authuser.avatar);


  

 
  const[data,setData]=useState({
    fullname:"",
    bio:"",
   nativelanguage:"",
    learninglanguage:"",
    location:"",
    
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
      
       const res= await getonBoard({...data,avatar});
        console.log(res.data.user);
        console.log("res.data",res.data);
       toast.success("onboarded Sucessfully");
       setAuthuser(res.data.user.user);
      //  console.log("onboard authuser",authuser);
      console.log(res.data.user.isonboarded);
      console.log(res.data.user.user.isonboarded);

       if(res.data.user.user.isonboarded){
        navigate("/")
       }
      
       
      
       
       
      
      
    } catch (error) {
      toast.error(error?.res?.data.message||"something went wrong");
      console.log(error);
      <Toaster/>
      
    }
    

  }
  const handleAvatar=()=>{
   const idx=Math.floor(Math.random()*100)+1;
        const randomavatar= `https://avatar.iran.liara.run/public/${idx}.png`;
        setAvatar(randomavatar);
       setAuthuser((prev)=>({
        ...prev,avatar:randomavatar

       }))
     
       toast.success("random avatar generated");
        
       

  }
  return(
    <>
    <div className="h-max-screen flex items-center justify-center " data-theme="forest">
      <div className="border m-6 rounded-3xl border-primary/25  flex flex-col gap-3 justify-center items-center   w-1/2  ">
      <div className="w-full flex flex-col p-8 items-center">

      <div className="p-5 ">
      <h1 className="text-5xl font-bold font-mono"> Onboarding</h1>
      </div>
      <p className="font-semibold m-3">complete your profile</p>
      <div className="rounded-full size-25 bg-amber-600 m-3" >
       <img src={`${avatar}`}/>
      </div>
      <button className="rounded-2xl font-semibold text-gray-700 bg-primary p-2" onClick={handleAvatar}>generate random avatar </button>

      <form className="flex flex-col gap-3 p-4 w-full  " 
      onSubmit={handleSubmit}>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="fullname">fullname</label>
          <input
          className="rounded-lg border border-primary/25 w-full p-1 " type="text"
          placeholder="enter your name"
          id="fullname"
          name="fullname"
          value={data.fullname}
          onChange={handleChange}
          required />
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="bio">bio</label>
          <textarea 
          className="rounded-lg border border-primary/25 w-full p-1 " 
          type="text"
          placeholder="enter your name"
          id="bio"
          name="bio"
          value={data.bio}
          onChange={handleChange}
          required ></textarea>
        </div>

        <div className="flex w-full gap-3">
          <div className="flex flex-col gap-1 w-1/2 ">
          <label htmlFor="native language">Native Language</label>
          <select 
          className="rounded-lg border border-primary/25 w-full p-1 " 
          type="text"
          placeholder="enter your name"
          id="native language"
          name="nativelanguage"
          value={data.nativelanguage}
          onChange={handleChange}
          required >
          <option data-theme="forest" >select</option>
          {LANGUAGES.map((curElem,index)=>{
            return <option data-theme="forest">{curElem}</option>

            
          })}
          </select>

          
          </div>


          <div className="flex flex-col gap-1 w-1/2 ">
          <label htmlFor="Learning Language">Learning Language</label>
          <select 
          className="rounded-lg border border-primary/25 w-full p-1 " 
          data-theme="forest"
          type="text"
          placeholder="enter your name"
          id="Learning Language"
          name="learninglanguage"
          value={data.learninglanguage}
          onChange={handleChange}
          required >
            <option>select</option>
            {LANGUAGES
            .filter((lang)=>
              lang!=data.nativelanguage)
              .map((curElem)=>{
              return <option>{curElem}</option>

            })}
           
          </select>
        </div>
        </div>

        <div className="flex flex-col gap-1 ">
          
          <label htmlFor="location">location</label>
          <input 
          className="rounded-lg border border-primary/25 w-full p-1 " 
          type="text"
          placeholder="enter your name"
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          required />
        
        </div>

        <button className="rounded-3xl bg-primary p-2 text-gray-800 font-semibold" >continue onboarding</button>
<Toaster/>
      </form>
        </div>
    </div>
    </div>
    </>
  )
}
export default OnBoard;