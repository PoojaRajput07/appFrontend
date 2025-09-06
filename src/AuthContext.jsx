import { createContext, useContext, useEffect, useState } from "react";
import { loggedUserInfo } from "./Axios";


const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[authuser,setAuthuser]=useState(null);
    const[isLoading,setisLoading]=useState(true);
    const fetchAuthUser=async()=>{
        try {
            const res=await loggedUserInfo();
            setAuthuser(res.data.user);
            setisLoading(false);
            
        } catch (error) {
            setAuthuser(null);
            setisLoading(false);
            
        }
    }
    useEffect(()=>{
        fetchAuthUser();
    },[])
    return (
        <AuthContext.Provider value={{authuser,setAuthuser,isLoading}}>
            {children}
        </AuthContext.Provider>
 
    )
}
     export const useAuth=()=>{
        return useContext(AuthContext);
}