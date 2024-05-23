"use client"

import type { Metadata } from "next";
import { Theme, useTheme } from '@mui/material/styles';
import Link from "next/link";
import { BsTools } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";


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

function getStyles(name: string, personName: readonly string[], theme: Theme) {

  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [personName, setPersonName] = useState<string[]>([]);


  return (
    <>
        <nav className="flex bg-blue-500 px-10 py-2 items-center justify-between">
          <Link href={"/home"} className="flex">
                <BsTools color="white" size="25" className="mr-5"/>
                <h2 className="text-white text-xl font-bold">EasyJob</h2>
          </Link>
          <div className="flex">
            {/* <select name="" id="">
              <option value="">Plomero</option>
              <option value="">Fontanero</option>
            </select> */}

            <FormControl sx={{ 
              m: "auto", 
              width: 250, 
            
              }}>
              <Select 
                  sx={{
                    height: 40,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white", 
                    mr: "10px"
                  }}
                  labelId="demo-customized-select-label"
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
                    color: "white"
                    
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
              <IoSearchSharp color="white" size="30" className="border p-1 rounded-md"/>
            </button>
          </div>
          <Link href={"/login"} className="flex px-2 py-1 border text-sm rounded-md border-white text-white font-normal">Log out</Link>
        </nav>
        <div className="flex px-60 pt-10">
          {children}
        </div>
    </>
  );
}
