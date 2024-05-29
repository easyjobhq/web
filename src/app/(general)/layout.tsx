

import type { Metadata } from "next";
import { styled } from '@mui/material/styles';
import { Theme, useTheme } from '@mui/material/styles';
import Link from "next/link";
import Footer from "./Footer";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import Navbar from "./navbar";


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
  const theme = JSON.parse(JSON.stringify(cookieStore.get('currentUser'))) as current;
  const tokenn = JSON.parse(theme.value) as user;

  return (
    <>
        <Navbar id={tokenn.id} />
        <div className="px-80 pt-10 w-full">
          {children}
        </div>
        <Footer/>
        

    </>
  );
}
