

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
  
  

  /*
    const fetchUserId = async () => {
      try {
        const response = await fetch('api/get-user-id', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Para enviar cookies con la solicitud
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        return data.userId
      } catch (err) {
        throw err;
      }
    };

  fetchUserId();
  */

  const cookieStore = cookies()

  let id:string
  if(cookieStore.get('currentUser') === undefined){
    id = ''
  }else{
    const theme = JSON.parse(JSON.stringify(cookieStore.get('currentUser'))) as current;
    const tokenn = JSON.parse(theme.value) as user;
    id = tokenn.id
    
    //if(userIdContext === ''){
      //setUserIdContext(id);
      //setEmailContext(tokenn.email);
      //const user: Client | any  = authService.getMe(id);
      //setUsernameContext( user.name + " " + user.last_name)

    //}
  }
  

  return (
    <>
        <Navbar id={id} />

        <div className="px-80 pt-10 w-full">
          {children}
        </div>
        <Footer/>
        

    </>
  );
}
