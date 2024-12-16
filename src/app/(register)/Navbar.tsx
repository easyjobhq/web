import { FormControl, Select } from '@mui/material';
import Box from 'next-auth/providers/box';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BsTools } from 'react-icons/bs';

function NavbarRegister() {
  return (
    <nav className="flex bg-blue-500 px-5 md:px-[10%] lg:px-[15%] py-4 items-center justify-between">
      <Link href={"/"} className="flex">
        <Image src="/EasyJob-logo-white.png" alt="EasyJob logo" width={25} height={25} layout="intrinsic" className="w-7 h-7 mr-3 object-fill flex-grow-0 self-center" />
        <h2 className="text-white text-2xl font-bold hidden sm:block">Easy Job</h2>
      </Link>
    </nav>
  )
}

export default NavbarRegister