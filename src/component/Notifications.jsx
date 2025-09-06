import React, { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'
import { acceptRequest, friendRequest } from '../Axios';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useAuth } from '../AuthContext';


const Notifications = () => {
    const{authuser,setAuthuser}=useAuth();
   const[acceptedrequest,setAcceptedrequest]=useState([]);
   const[pendingrequest,setPendingrequest]=useState([]);

    const{theme}=useTheme();

    useEffect(()=>{
        const requestList=async()=>{
        try {
            const res=await friendRequest()
            console.log("incoming request list ",res);
            setAcceptedrequest(res.data.acceptedRequest[0]);
            // const sender=res.data.pendingRequest[0].sender;
            const pendingRequestList=Array.isArray(res.data.pendingRequest)?res.data.pendingRequest:[res.data.pendingRequest]
            setPendingrequest(pendingRequestList);
            console.log("res.data.pendingRequest",res.data.pendingRequest)
            console.log("authuser",authuser)

            
        } catch (error) {
            console.log(error?.data?.message);
            
        }
    }
    requestList();
},[])
  
const handleAccept=async(id)=>{
    try {
        const res=await acceptRequest(id);
        console.log("accept request res",res);
        setAcceptedrequest(id);
        
        
    } catch (error) {
        console.log("error",error);
        console.log(error?.data?.message);
        
    }

}
  return (
    <div className='h-full w-full flex flex-col  'data-theme={theme} >
        <div  className='h-full  flex flex-col gap-4 p-4 w-full ' data-theme={theme}>
            <div className='flex items-center gap-1'>
            <LiaUserFriendsSolid className='size-8' />
        <h1 className='font-bold text-4xl'> Notifications</h1>
        </div>
        <div className='flex gap-1 items-center  w-full'>
            <h2 className="font-semibold text-xl ">Friend Requests</h2>
       
            <p className='bg-primary w-[20px] rounded-full flex items-center justify-center font-bold text-black text-sm'>{pendingrequest.length}</p></div>
       

        <div  className=" flex flex-col flex-1 w-full gap-4 justify-start" >
            {pendingrequest.length===0?<h1>No requests</h1>:<div>
                {pendingrequest.map((curElem,index)=>{
                    const{avatar,fullname,learninglanguage,nativelanguage}=curElem.sender;
                    
                    return (
                        <>
                    <div className="flex  justify-start items-center gap-4 w-full  p-3">
                        <div className='w-full flex flex-justify-start items-center  gap-1 '>
                    <img src={`${avatar}`} className="rounded-full size-12 "/>
                    <div className='flex flex-col'>
                        <h1 className='font-semibold text-lg ml-2 '>{fullname}</h1>
                        <div className='flex gap-2'>
                            <button className='w-[150px] rounded-xl bg-primary text-black '>{`native : ${nativelanguage}`}</button>
                            <button className='w-[150px] rounded-xl border border-primary text-white '>{`learning : ${learninglanguage}`}</button>
                        </div>
                        </div>
                        
                    </div>
                    
                        <button className=' w-[100px] h-[40px] flex justify-center p-3 bg-primary rounded-full  text-black items-center font-semibold ' 
                        onClick={()=>{handleAccept(curElem._id)}}
                        >Accept</button></div>


                    



                    
                    
                    </>
                    )

                })}</div>}
        </div>

        
        </div>
        
      
    </div>
  )
}


export default Notifications;
