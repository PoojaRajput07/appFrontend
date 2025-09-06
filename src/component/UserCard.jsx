import React, { useEffect, useState } from 'react'
import {sentRequest } from '../Axios';
import Chat from './ChatInfo';
import { useNavigate } from 'react-router-dom';

const UserCard = ({curElem,type}) => {
  // const[btndisabled,setBtndisabled]=useState(false);
  const navigate=useNavigate();

  const[btn,setBtn]=useState({
    text:"sent friend request",
    disabled:false
    
  })
  useEffect(()=>{
   let savesentRequest=JSON.parse(localStorage.getItem("savesentRequest"))||[];
    const existing=savesentRequest.find(request=>curElem._id===request.receiver);
    if(existing){
      setBtn({text:existing.status,disabled:true})
    }
    else{
      setBtn({text:"send friend request",disabled:false})
    }
  },[curElem._id])
  const handleSendRequest=async(id)=>{
      // alert("request sent");
     try {
      const res=await sentRequest(id);
      console.log("request sent response ",res);
      setBtn({
        text:res.data.friendRequest.status,
        disabled:true
      })
      // setBtndisabled(true);
     let savesentRequest= JSON.parse(localStorage.getItem("savesentRequest"))||[];
     console.log("localhost ka data",savesentRequest);
     savesentRequest.push({
      receiver:res.data.friendRequest.receiver,
      status:res.data.friendRequest.status

     }
     )
     localStorage.setItem("savesentRequest",JSON.stringify(savesentRequest));

    //  for testing to delete from the localstorage 
    //  savesentRequest=savesentRequest.filter(req=>req.receiver!=curElem._id);
    //  localStorage.setItem("savesentRequest",JSON.stringify(savesentRequest));
    //  console.log("localhost is working");
    //  setBtn({
    //   text:"sent friend request",
    //   disabled:false
    //  })
    //   console.log("After delete:", savesentRequest);

     } catch (error) {
      console.log(error.data?.message);
      
     }

  }

  const handleMessage=()=>{
    return alert("message btn is clicked");
  }
  return (
    <div>
        <div className="w-[340px] rounded-lg  bg-primary/5 flex flex-col items-center  gap-3 p-5 ">
      
      <div className="flex justify-start   gap-3 w-full ">
        
        <img  className="size-10 "src={curElem.avatar}/>
        <div className='flex flex-col '>
        <h1 className="text-lg font-semibold">{curElem.fullname}</h1>
        <p>{curElem.location}</p>
        </div>
        </div>


        <div className="flex w-full gap-5">
          <button className="bg-primary text-white rounded-xl  w-[200px]">{`native : ${curElem.nativelanguage}`}</button>
          <button className=" border border-primary rounded-xl  w-[250px]">{`learning : ${curElem.learninglanguage}`}</button>
        </div>
        <div className='flex justify-start w-full'><p>{curElem.bio}</p></div>
        {
        type==="friends"?<button className='font-semibold  w-full p-3 border border-white rounded-full ' onClick={()=>{navigate(`/chatInfo/${curElem._id}`)}}>message</button>
        :<button className="font-semibold  w-full p-3 border border-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={btn.disabled} 
        onClick={()=>{
          
          handleSendRequest(curElem._id)}}>
            <p>{`${btn.text}`}</p></button>}

        
        
        </div>
      
    </div>
  )
}

export default UserCard
