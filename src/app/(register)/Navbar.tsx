import { FormControl, Select } from '@mui/material';
import Box from 'next-auth/providers/box';
import Link from 'next/link';
import React from 'react'
import { BsTools } from 'react-icons/bs';

function NavbarRegister() {
  return (
    <nav className="flex bg-blue-500 px-80 py-4 items-center justify-between">
        <Link href={"/home"} className="flex">
              <BsTools color="white" size="30" className="mr-5"/>
              <h2 className="text-white text-2xl font-bold">Easy Job</h2>
        </Link> 
      </nav>
  )
}

export default NavbarRegister