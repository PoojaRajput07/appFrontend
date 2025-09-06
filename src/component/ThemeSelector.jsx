import React from 'react'
import { THEMES } from "../constant/constant"
import { IoIosColorPalette } from 'react-icons/io';
import { useTheme } from '../ThemeContext';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger button */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <IoIosColorPalette className="size-6"/>
      </button>

      {/* Dropdown content */}
      <div tabIndex={0} className="dropdown-content mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto">
        <div className="space-y-1">
          {
            THEMES.map((curElem, index) => {
              const { name, colors } = curElem;
              return (
                <button 
                  key={index}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg ${theme===name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}`}
                  onClick={() => {setTheme(name),
                    localStorage.setItem("appTheme",name)}
                   
                  }
                >
                  <IoIosColorPalette/>
                  <span>{name}</span>
                  <div className="flex gap-1 ml-auto">
                    {colors.map((color, i) => (
                      <span 
                        key={i} 
                        className="w-3 h-3 rounded-full border" 
                        style={{backgroundColor: color}}
                      />
                    ))}
                  </div>
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
