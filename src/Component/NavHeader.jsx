import React from 'react'
import { NavLink } from 'react-router-dom'
function NavHeader() {
  return (
    <header className="font-medium text-center text-xl text-white bg-[#2C2D42] px-10 h-[4rem] flex gap-5 justify-between justify-item-center items-center ">
      <div>
        <NavLink to={"/"}>Blogger</NavLink>
      </div>
      
      <div>
    
      </div>
    </header>
  )
}

export default NavHeader