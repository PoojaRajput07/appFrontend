import { useContext, useState,createContext } from "react";

const ThemeContext=createContext();
export const ThemeProvider=({children})=>{
    const[theme,setTheme]=useState(localStorage.getItem("appTheme")||"coffee");

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}
export const useTheme=()=>{
    return useContext(ThemeContext);
}
