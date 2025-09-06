import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getStreamToken } from '../Axios';
 import {Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window} from "stream-chat-react"
import { StreamChat } from 'stream-chat';
import { TbArrowSharpTurnLeft } from 'react-icons/tb';
import ChatLoader from './ChatLoader';
import { MdOutlineVideoCall } from "react-icons/md";
import { useTheme } from '../ThemeContext';
import CallButton from './CallButton';
const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY



const ChatInfo = () => {
    const{theme}=useTheme();
    
    const {id:targetUserId}=useParams();
    console.log("id",targetUserId);
    const[chatClient,setChatClient]=useState(null);
    const[channel,setChannel]=useState(null);
    const[loading,setLoading]=useState(true);
    const{authuser}=useAuth();
   
    useEffect(()=>{
        const getToken=async()=>{
            try {
                const res=await getStreamToken();
                console.log("stream token ",res.data.token); 
                const client=StreamChat.getInstance(STREAM_API_KEY)
                console.log("user avatar",authuser.avatar);
                await client.connectUser({
                    id:authuser._id,
                    name:authuser.fullname,
                    image:authuser.avatar
                },res.data.token)
                console.log("user connected");
                const channelId=[authuser._id,targetUserId].sort().join('-')
                
                //you and me in chat
                //if i start the chat=[myID,yourID]
                //if you stqart the channel=[yourId,myId]
//both form different rrom for chat
//but we want the same channel/room to chat with each other 
//hence we sort them and join them with - for readablility
const curChannel=client.channel("messaging",channelId,{members:[authuser._id,targetUserId]})  
await curChannel.watch();    
setChatClient(client);
setChannel(curChannel);
setLoading(false);
            } catch (error) {
                console.log("token error",error?.response?.data?.message||error.message)
                toast.error("could not connect to chat ,please try again later");
                
            }finally{
                setLoading(false);
            }

        }
        getToken();
    },[authuser,targetUserId]

);
const handleVedioCall=()=>{
    if(channel){
        const callUrl=`${window.location.origin}/call/${channel.id}`
        channel.sendMessage({
            text:`i have started a vedio call....join me here ${callUrl}`,

        });
        toast.success("vedio call link sent successfully ")
    }
}
if(loading||!chatClient||!channel)return<ChatLoader/>


      return (
    <div className='h-[93vh]'  >
        <Chat client={chatClient}>
            <Channel channel={channel}> 
                <div className='w-full relative ' data-theme={theme} >
                    <CallButton  handleVedioCall={handleVedioCall}/>
                    <Window>
                        <ChannelHeader/>
                        <MessageList/>
                        <MessageInput focus/>
                    </Window>
                </div>
                <Thread/>
            </Channel>
        </Chat>
       
      
    </div>
  )
}


export default ChatInfo
