import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import { AppLayout } from "./component/AppLayout"
import Home from "./component/Home"
import Login from "./component/Login"
import Logout from "./component/Logout"
import OnBoard from "./component/OnBoard"
import { Signup } from "./component/Signup"
import { Toaster } from "react-hot-toast";


import {  useAuth } from "./AuthContext"
import { useTheme } from "./ThemeContext"
import Notifications from "./component/Notifications"
import Chat from "./component/ChatInfo"
import ChatInfo from "./component/ChatInfo"
import CallPage from "./component/CallPage"





export const App=()=>{
  const{theme}=useTheme();
    const{authuser,isLoading}=useAuth();
    
  if(isLoading){
    return<h2>loading</h2>
  }
  const onboarded=authuser?.isonboarded;
  console.log("app.jsx mai",onboarded);


 return (
  <>
    <Toaster position="top-right" />

    <div data-theme={theme}>
      <Routes>
        {/* Signup route – first time users */}
        <Route path="/signup" element={!authuser ? <Signup /> : <Navigate to="/" />} />

        {/* Login route – for existing users who are logged out */}
        <Route path="/login" element={!authuser ? <Login /> : <Navigate to="/" />} />

        {/* Root route – send users where they belong */}
        <Route 
          path="/" 
          element={
            !authuser 
              ? <Navigate to="/signup" />            // new visitor → signup
              : !onboarded 
                ? <Navigate to="/onboard" />        // logged in but not onboarded → onboard
                : <AppLayout showSidebar={true}><Home /></AppLayout>  // fully logged in
          } 
        />

        {/* Onboarding route */}
        <Route 
          path="/onboard" 
          element={
            !authuser 
              ? <Navigate to="/login" /> 
              : onboarded 
                ? <Navigate to="/" /> 
                : <OnBoard />
          } 
        />

        {/* Logout */}
        <Route path="/logout" element={authuser ? <Logout /> : <Navigate to="/login" />} />

        {/* Protected routes */}
        <Route path="/notifications" element={!authuser ? <Navigate to="/login" /> : <AppLayout showSidebar={true}><Notifications /></AppLayout>} />
        <Route path="/chatinfo/:id" element={!authuser ? <Navigate to="/login" /> : <AppLayout><ChatInfo /></AppLayout>} />
        <Route path="/call/:id" element={authuser && onboarded ? <CallPage /> : !onboarded ? <Navigate to="/onboard" /> : <Navigate to="/" />} />
      </Routes>
    </div>
  </>
);
}
