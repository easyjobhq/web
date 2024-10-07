import { Box, FormControl, MenuItem, Select } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdClose } from "react-icons/io";

// Define the prop type
interface SideBarMenuProps {
  clickedFunction: React.Dispatch<React.SetStateAction<boolean>>;
}


const ResponsiveNavbar: React.FC<SideBarMenuProps> = ({ clickedFunction }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50 py-3 px-7" style={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}>
      <div className="flex justify-between">
        <Image src="/EasyJob-logo-white.png" alt="EasyJob logo" width={25} height={25} layout="intrinsic" className="w-7 h-7 mr-3 object-fill flex-grow-0 self-start" />
        <IoMdClose className='text-4xl cursor-pointer font-bold' onClick={() => {
          clickedFunction(false)
        }} />
      </div>
      <ul className='w-full py-8 space-y-3'>
        <Box sx={{ minWidth: 250, height: 50 }}>
          <FormControl fullWidth>
            <Select
              sx={{
                height: 50,
                bgcolor: "white",
                color: "white",
                mx: "15px",
                border: '0.25px solid rgba(255, 255, 255, 0.5)'
              }}
              value={() => { }}
              displayEmpty
              onChange={() => { }}
            >
              <MenuItem value={'Especialidad'}>Sin filtro</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 250, height: 50 }}>
          <FormControl fullWidth>
            <Select
              sx={{
                height: 50,
                bgcolor: "white",
                color: "white",
                mx: "15px",
                border: '0.25px solid rgba(255, 255, 255, 0.5)'
              }}
              value={() => { }}
              displayEmpty
              onChange={() => { }}
            >
              <MenuItem value={'Especialidad'}>Sin filtro</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Link href="/login" passHref>
          <li className="w-full text-center border-b text-base py-3 font-bold cursor-pointer">
            Iniciar Sesión
          </li>
        </Link>
        <Link href="/" passHref>
          <li className="w-full text-center border-b text-base py-3 font-bold cursor-pointer">
            Salir
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default ResponsiveNavbar