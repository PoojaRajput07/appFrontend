import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { getStreamToken } from "../Axios";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authuser, isLoading } = useAuth();

  useEffect(() => {
    if (!authuser || !authuser._id) return;

    let videoClient;
    let callInstance;

    const initCall = async () => {
      try {
        const res = await getStreamToken();

        const user = {
          id: authuser._id,
          name: authuser.fullname,
          image: authuser.avatar,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: res.data.token,
        });

        callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        console.log("✅ Joined call successfully");
        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("❌ Error joining call:", error);
        toast.error("Could not join the call. Please try again");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    // cleanup on unmount
    return () => {
      if (callInstance) callInstance.leave();
      if (videoClient) videoClient.disconnectUser();
    };
  }, [authuser, callId]);

  if (isLoading) {
    return <h1 className="text-center mt-10">Loading user...</h1>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        {isConnecting ? (
          <div className="flex items-center justify-center h-full">
            <p>🔄 Connecting to call...</p>
          </div>
        ) : client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>❌ Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
