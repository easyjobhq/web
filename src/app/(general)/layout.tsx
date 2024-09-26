

import type { Metadata } from "next";
import { styled } from '@mui/material/styles';
import { Theme, useTheme } from '@mui/material/styles';
import Link from "next/link";
import Footer from "./Footer";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import Navbar from "./navbar";
import { useGlobalContext } from '@/context/store';
import { Client } from "@/interfaces/Client";
import { authService } from "@/services";


const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface current {
  name: string;
  value: string;
}

interface user {
  id: string;
  email: string;
  password: string;
  token: string;
}

//const { userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext } = useGlobalContext(); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = cookies()

  let id:string
  if(cookieStore.get('currentUser') === undefined){
    id = ''
  }else{
    const theme = JSON.parse(JSON.stringify(cookieStore.get('currentUser'))) as current;
    const tokenn = JSON.parse(theme.value) as user;
    id = tokenn.id
  }
  

  return (
    <>
        <Navbar id={id} />

        <div className="px-80 pt-10  min-h-screen">
          {children}
        </div>
        <Footer/>
        

    </>
  );
}
