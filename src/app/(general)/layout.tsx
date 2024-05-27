"use client"

import type { Metadata } from "next";
import { styled } from '@mui/material/styles';
import { Theme, useTheme } from '@mui/material/styles';
import Link from "next/link";
import { BsTools } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import InputBase from '@mui/material/InputBase';
import Footer from "./Footer";


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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [personName, setPersonName] = useState<string[]>([]);



  return (
    <>
        <nav className="flex bg-blue-500 px-80 py-3 items-center justify-between">
          <Link href={"/home"} className="flex">
                <BsTools color="white" size="30" className="mr-5"/>
                <h2 className="text-white text-2xl font-bold">EasyJob</h2>
          </Link>
          <div className="flex">
            <FormControl sx={{ 
              m: "auto", 
              width: 250, 
            
              }}>
              <Select 
                  sx={{
                    height: 40,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white", 
                    mr: "15px", 
                    border: '0.25px solid rgba(255, 255, 255, 0.5)'
                  }}
                  multiple
                  value={personName}
                  displayEmpty
                  //MenuProps={MenuProps}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Profesion</em>;
                    }
                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                  <em>Profesion</em>
                </MenuItem>
                <MenuItem
                    key="1"
                    value="Plomero"    
                  >
                  Plomero
                </MenuItem>
                
              </Select>
            </FormControl>

            <FormControl sx={{ 
              m: "auto", 
              width: 250, 
            
              }}>
              <Select 
                  sx={{
                    height: 40,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    mr: "10px", 
                    color: "white",
                    border: '0.25px solid rgba(255, 255, 255, 0.5)',
                  }}
                  multiple
                  value={personName}
                  displayEmpty
                  //MenuProps={MenuProps}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Ciudad</em>;
                    }
        
                    return selected.join(', ');
                  }}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem 
                  disabled
                  value=""
                  sx= {{bgcolor: "#eeeeee"}}>
                  <em>Ciudad</em>
                </MenuItem>
                
                
              </Select>
            </FormControl>
            <button className="flex justify-center items-center">
              <IoSearchSharp color="white" size="40" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}} className="border p-1.5 rounded-full"/>
            </button>
          </div>
          <Link href={"/login"} className="flex px-2 py-1 border text-sm rounded-md border-white text-white font-normal">Log out</Link>
        </nav>
        <div className="px-80 pt-10 w-full">
          {children}
        </div>
        <Footer/>
        

    </>
  );
}
