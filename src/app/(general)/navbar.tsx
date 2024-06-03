"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { BsTools } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Check } from "@/services/checkStatus.service";
import { checkService } from "@/services";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { City } from "@/interfaces/city";
import { Speciality } from "@/interfaces/speciality";
import { authService } from '@/services'
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { useGlobalContext } from "@/context/store";
import { Client } from "@/interfaces/Client";
import { AuthService } from '@/services/auth.service'


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

    const { userIdContext, setUserIdContext, emailContext, setEmailContext , usernameContext, setUsernameContext} = useGlobalContext(); 

    const [personName, setPersonName] = useState<string[]>([]);
    const [isProfessional, setIsProfessional] = useState<number | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [specialities, setSpecialities] = useState<Speciality[]>([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    
    useEffect(()=>{

        const fetchData = async () =>{

            if(props.id === undefined){
                setIsProfessional(null)
            }else{
                const response  = await checkService.checkIsProfessional(props.id);
                setIsProfessional(response)
            }

            const responseCities = await authService.getAllCities();
            setCities(responseCities);

            const responseSpecialities = await authService.getAllSpecialities();
            setSpecialities(responseSpecialities);

            if(userIdContext === ''){
              setUserIdContext(props.id);
              console.log(props.id)
              const user: Client | any  = await authService.getMe(props.id);
              console.log(user)
              setEmailContext(user.email);
              setUsernameContext( user.name)
            }
        }

        fetchData();

    },[])

    const handleSearch = async () => {
      if (selectedCity && selectedSpeciality) {
          const results = await authService.searchProfessionals(selectedCity, selectedSpeciality);
          console.log(results); // Aquí puedes manejar los resultados, por ejemplo, actualizando un estado
      } else {
          alert('Por favor, seleccione una ciudad y una especialidad');
      }
  }
      
    return (
        <nav className="flex bg-blue-500 px-80 py-3 items-center justify-between">
        <Link href={"/home"} className="flex">
              <BsTools color="white" size="30" className="mr-5"/>
              <h2 className="text-white text-2xl font-bold">Easy Job</h2>
        </Link>
        <div className="flex">
          
          <Box sx={{ minWidth: 250, height: 40 }}>
            <FormControl fullWidth>
              <Select
                sx={{
                  height: 40,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white", 
                  mr: "15px", 
                  border: '0.25px solid rgba(255, 255, 255, 0.5)'
                }}
                value={selectedSpeciality}
                displayEmpty
                renderValue={(selected) => {
                  //console.log(selected)
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
                {
                  specialities.map((speciality) => (
                    <MenuItem value={`${speciality.speciality_name}`}>{speciality.speciality_name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 250, height: 40 }}>
            <FormControl fullWidth>
              <Select
                sx={{
                  height: 40,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white", 
                  mr: "15px", 
                  border: '0.25px solid rgba(255, 255, 255, 0.5)'
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="Age"
                displayEmpty
                renderValue={(selected) => {
                  //console.log(selected)
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
                {
                  cities.map((city) => (
                    <MenuItem value={`${city.city_name}`}>{city.city_name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          
          <button className="flex justify-center items-center" onClick={handleSearch}>
            <IoSearchSharp color="white" size="40" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}} className="border p-1.5 rounded-full"/>
          </button>
        </div>
        
        
        <div className="flex text-3xl text-white">
          {isProfessional != null && (
            <Link href={`/profile/${props.id}`}>
              <button className="mr-3" type="button">
                <CgProfile />
              </button>
            </Link>
          )}
          <Link href={"/login"} className=" "><MdLogout /></Link>
        </div>
        
      </nav>
    );
  }