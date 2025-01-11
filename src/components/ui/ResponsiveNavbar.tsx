import { City } from '@/interfaces/city';
import { Speciality } from '@/interfaces/speciality';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { MdLogout } from 'react-icons/md';
import { MdOutlineLogin } from "react-icons/md";
import PersonIcon from '@mui/icons-material/Person';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/auth/logout';

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

  const { user, refetchUser } = useCurrentUser();
  const router = useRouter();
  const {logout} = useLogout();

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 py-3 px-10 mt-14 bg-white">
      <div className="flex justify-end">
        <IoMdClose className='text-4xl cursor-pointer font-bold text-blue-500' onClick={() => {
          clickedFunction(false)
        }} />
      </div>
      {/* <p className='text-black'>{JSON.stringify(user)}</p> */}
      {user && (
        <div
          className='flex items-center mt-5 space-x-4 shadow-md border rounded-lg p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105'
          onClick={() => {
            if (user.roles.includes('client')) {
              router.push(`/profile/client/${user.id}`)
            } else {
              router.push(`/profile/${user.id}`)
            }
          }
          }
        >
          <div className='text-gray-600 border rounded-full w-fit p-3 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg transform transition-transform duration-300 hover:scale-105'>
            <PersonIcon className='text-4xl text-white' />
          </div>
          <p className='text-gray-500 font-semibold text-lg'>{user.name} {user.last_name}</p>
        </div>
      )}
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
          className="mb-10 h-12 w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 text-white font-semibold text-lg"
          onClick={() => {
            handleSearch()
            clickedFunction(false);
          }}
        >
          Buscar
        </button>

        {
          !user ? (
            <Link href="/login" passHref>
              <li className="flex items-center justify-start w-full text-center border-y border-y-blue-500 text-base py-3 mt-5 cursor-pointer text-black">
                <MdOutlineLogin className='mr-3' /><p>Iniciar Sesión</p>
              </li>
            </Link>
          ) : (
            <div
            onClick={() => {
              logout()
              router.push('/')
              clickedFunction(false)
            }}
            >
              <li className="flex mt-5 items-center justify-start w-full text-center border-y border-y-blue-500 text-base py-3 cursor-pointer text-black">
                <MdLogout className='mr-3' /> <p>Salir</p>
              </li>
            </div>
          )
        }
      </ul>
    </div>
  )
}

export default ResponsiveNavbar;
