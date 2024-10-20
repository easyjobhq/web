import { City } from '@/interfaces/city';
import { Speciality } from '@/interfaces/speciality';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { MdLogout } from 'react-icons/md';
import { MdOutlineLogin } from "react-icons/md";

// Define the prop type
interface SideBarMenuProps {
  clickedFunction: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
  specialities: Speciality[];
  selectedCity: string;
  selectedSpeciality: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSpeciality: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => Promise<void>;
}

const ResponsiveNavbar: React.FC<SideBarMenuProps> = ({
  clickedFunction,
  cities,
  specialities,
  selectedCity,
  selectedSpeciality,
  setSelectedCity,
  setSelectedSpeciality,
  handleSearch
}) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50 py-3 px-10 mt-14 bg-white">
      <div className="flex justify-end">
        <IoMdClose className='text-4xl cursor-pointer font-bold text-blue-500' onClick={() => {
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
                color: "black",
                border: '0.25px solid rgba(255, 255, 255, 0.5)'
              }}
              value={selectedSpeciality}
              displayEmpty
              renderValue={(selected) => {
                if (selected == '') {
                  return <em>Especialidad</em>;
                } else {
                  return <em>{selected}</em>
                }
              }}
              onChange={(event: SelectChangeEvent) => {
                setSelectedSpeciality(event.target.value);
              }}
            >
              <MenuItem value={''}>Sin filtro</MenuItem>
              {
                specialities.map((speciality) => (
                  <MenuItem key={speciality.id} value={`${speciality.speciality_name}`}>{speciality.speciality_name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 250, height: 50 }}>
          <FormControl fullWidth>
            <Select
              sx={{
                height: 50,
                bgcolor: "white",
                color: "black",
                border: '0.25px solid rgba(255, 255, 255, 0.5)'
              }}
              value={selectedCity}
              displayEmpty
              renderValue={(selected) => {
                if (selected == '') {
                  return <em>Ciudad</em>;
                } else {
                  return <em>{selected}</em>
                }
              }}
              onChange={(event: SelectChangeEvent) => {
                setSelectedCity(event.target.value);
              }}
            >
              <MenuItem value={''}>Sin filtro</MenuItem>
              {
                cities.map((city) => (
                  <MenuItem key={city.id} value={`${city.city_name}`}>{city.city_name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>

        <button
          className="mb-10 h-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
          onClick={() => {
            handleSearch()
            clickedFunction(false);
          }}
        >
          Buscar
        </button>

        <Link href="/login" passHref>
          <li className="flex items-center justify-start w-full text-center border-b border-b-blue-500 border-t border-t-blue-500 text-base py-3 mt-3 cursor-pointer text-black">
            <MdOutlineLogin className='mr-3' /><p>Iniciar Sesión</p>
          </li>
        </Link>
        <Link href="/" passHref>
          <li className="flex items-center justify-start w-full text-center border-b border-b-blue-500 text-base py-3 cursor-pointer text-black">
            <MdLogout className='mr-3' /> <p>Salir</p>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default ResponsiveNavbar;
