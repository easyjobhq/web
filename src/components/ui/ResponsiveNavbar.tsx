import React from 'react'
import { IoMdClose } from "react-icons/io";

// Define the prop type
interface SideBarMenuProps {
  clickedFunction: React.Dispatch<React.SetStateAction<boolean>>;
}


const ResponsiveNavbar: React.FC<SideBarMenuProps> = ({ clickedFunction }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      Hello there
      <IoMdClose className='cursor-pointer' onClick={() => {
        clickedFunction(false)
      }}/>
    </div>
  )
}

export default ResponsiveNavbar