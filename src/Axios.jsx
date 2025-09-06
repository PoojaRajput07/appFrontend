import axios from "axios"
// const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5000/api"   // local testing ke liye
//     : "https://appbackend-ahuc.onrender.com/api";  // Render backend URL
const BASE_URL = "http://localhost:5000/api";


const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
     timeout: 10000,
})
export const doLogin=(data)=>{
    return api.post("/auth/login",data)
}

export const doSignUp=(data)=>{
    return api.post("/auth/signup",data)

}
export const doLogout=()=>{
    return api.post("/auth/logout")

}

export const getonBoard=(data)=>{
    return api.post("/auth/onboard",data);
}
export const loggedUserInfo=()=>{
    return api.get("/auth/me")

}
export const findFriends=()=>{
    return api.get("/user/friends");

}
export const findRecommendations=()=>{
    return api.get("/user/")
}

export const sentRequest=(id)=>{
    return api.post(`/user/sentfriendRequest/${id}`)
}
export const friendRequest=()=>{
    return api.get("/user/friendsList")
}

export const acceptRequest=(id)=>{
    return api.put(`user/acceptfriendRequest/${id}`)

}
export const FriendsInfo=()=>{
    return api.get("user/friendsList")
}


export const getStreamToken=()=>{
    return api.get("/chat/token")
}