
import Sidebar from "./Sidebar"

import NavBar from "./NavBar"


export const AppLayout=({showSidebar=false,children})=>{
    return(
        <>
        <div className="flex min-h-screen"> 
            { showSidebar && <Sidebar/>}
            <div className="flex flex-1 flex-col">
              <NavBar/>
                <main className="flex-1" >
                {children}
                </main>
                
            </div>
        </div>
        </>
    )
}