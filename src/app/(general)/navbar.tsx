"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { BsTools } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Check } from "@/services/checkStatus.service";
import { checkService } from "@/services";


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

interface Props {
    id: string
}

export default function Navbar(props: Props) {
    const [personName, setPersonName] = useState<string[]>([]);
    const [isProfessional, setIsProfessional] = useState<number | null>(null)
    
    useEffect(()=>{

        const fetchData = async () =>{
            const response  = await checkService.checkIsProfessional(props.id);
            setIsProfessional(response)
        }

        fetchData();

    },[])
      
    return (
        <nav className="flex bg-blue-500 px-80 py-3 items-center justify-between">
        <Link href={"/home"} className="flex">
              <BsTools color="white" size="30" className="mr-5"/>
              <h2 className="text-white text-2xl font-bold">Easy Job</h2>
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
        {isProfessional != null && (
            <div className="m-4">
            <ul className="mb-4 flex flex-col gap-1">
              
              <li>
              <Link href={`/profile/${props.id}`}>
                  <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                      <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                    </svg>
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">profile</p>
                    
                  </button>
                </Link>
              </li>
            </ul>
        </div>
        )}
        
        <Link href={"/login"} className="flex px-2 py-1 border text-sm rounded-md border-white text-white font-normal">Log out</Link>
      </nav>
    );
  }