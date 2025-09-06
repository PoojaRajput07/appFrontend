
import { useEffect, useState } from "react";
import { findFriends, findRecommendations, FriendsInfo } from "../Axios";
import { useTheme } from "../ThemeContext";
import toast from "react-hot-toast";
import UserCard from "./UserCard";
import { FaUserFriends } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";


const Home=()=>{
  const{authuser,setAuthuser}=useAuth();
  const[senderDetail,setSenderDetail]=useState([]);
  const[friends,setFriends]=useState([]);
  const[recommendations,setRecommendations]=useState([])
  const{theme}=useTheme();
  useEffect(()=>{
    const fetchRecommendations=async()=>{
    try {
      const res=await findRecommendations();
     console.log("res",res); 
     console.log("res.data",res.data);
     console.log("res.data.recommendations",res.data.recommendations);
      setRecommendations(res.data.recommendations);
      console.log("recommendations",recommendations);
      // toast.success("recommendations fetched");


      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  const fetchFriends=async()=>{
    try {
      const res=await findFriends();
      console.log("friends res",res.data.friends);
      setFriends(res.data.friends);
      setAuthuser((prev)=>({
        ...prev,friends:res.data.friends

      }))
      // toast.success("friends fetched");


      
    } catch (error) {
      console.log(error?.data?.message);
      
    }
  }
  // const fetchFriendsDetails=async()=>{
  //   try {
  //     const res=await FriendsInfo();
  //     console.log("senderDetail",res.data.acceptedRequest);
      
  //     setSenderDetail(res.data.acceptedRequest);
      
  //   } catch (error) {
  //     console.log(error?.data?.message);
      
  //   }
  // }
  // console.log("mere friends",friends);
  

  fetchRecommendations();
  fetchFriends();
  // fetchFriendsDetails();
  },[])


 

  

  
  return(
    <>
    <div className="h-full w-full flex flex-col p-0 " data-theme={theme} >

      {/* title sections */}
      <div className="w-full flex bg-primary/2 p-2">
      <div className="flex justify-start items-center w-1/2">
      <h1 className="font-semibold ml-0.5 ">MY FRIENDS</h1>
      </div>
      <div className="flex justify-end w-full ">
       
      <Link to="/notifications" ><button className="p-3 w-full  rounded-2xl bg-primary/20 w-1/3 font-semibold p-1 flex items-center justify-center gap-1"><FaUserFriends  />Friends Request</button>
      </Link>
      </div>
      </div>
{/* friends */}
      <div className="w-full">
        {friends.length==0?
        <div className="flex  flex-col justify-center items-center m-5 font-semibold ">
        <h1 className="flex justify-center font-bold text-lg">
          no friends yet</h1>
          <p className="text-black  ">
            connect with language partners below to start practicing together </p></div>:(
             <div className="flex flex-wrap gap-2 w-full ">
         {friends.map((curElem,index)=>{
      return(
      
      <UserCard curElem={curElem} key={index} type="friends" />
      
    
    )
      
    

    })}

    </div>

          
        )}
      
    </div>

    {/* recommations */}
      <h1 className="font-bold text-xl ">Meet new learners</h1>
      <p className="text-primary mb-5">discover perfect language learner partners based on their profile</p>

       <div className="flex flex-wrap gap-2 w-full ">
        {recommendations.length==0?
        <div>
          <h1>No recommations available</h1>
          <p>check back later for new language partner</p>
          </div>:
          <div className="flex flex-wrap gap-2 w-full ">{recommendations.map((curElem,index)=>{
      return(
      <UserCard curElem={curElem} key={index} type={recommendations}/>
    )
     
    

    })}
    </div>}
     

    </div>
    </div>

   
    </>
  )
}
export default Home;