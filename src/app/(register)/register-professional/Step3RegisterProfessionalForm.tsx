'use client'

import { useRegisterClientContext } from '@/context/RegisterClient';
import { FormControl, makeStyles, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRegisterProfessionalContext } from '@/context/RegisterProfessional';
import { City } from '@/interfaces/city';
import { Speciality } from '@/interfaces/speciality';
import { authService } from '@/services';
import Box from '@mui/material/Box';
import DynamicIcon from '@/components/ui/icons/DynamicIcon';
import Modal from '@/components/ui/Modal';

function Step3RegisterProfessionalForm() {


    const {
        nextStep,
        prevStep,
        cityId,
        setCityId,
        setCityName,
        specialityId,
        setSpecialityId,
        setSpecialityName
    } = useRegisterProfessionalContext();

    const [cities, setCities] = React.useState<City[]>();
    const [specialities, setSpecialities] = React.useState<Speciality[]>();
    const [address, setAddress] = useState('');

    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    const [isError, setIsError] = React.useState(false);

    const getCurrentLocation = () => {
        
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            
            (position) => {
              console.log(position);
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              setIsError(false); // Resetear errores si la ubicación se obtiene correctamente
            },
            (err) => {
              setIsError(true);
              console.error(err);
            }
          );
        } else {
          setIsError(true);
        }
        
        

    };

    const handleSubmit = () => {
        if(location.latitude === 0 && location.longitude === 0){
            const newAddress = address.replace('#', '')
            const finalAddress = newAddress.replace(',', ' ');
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(finalAddress + '+CO').replace(/%20/g, "+")}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`)
            .then((response) => response.json())
            .then((data) => {

                console.log(encodeURIComponent(address + 'Co').replace(/%20/g, "+"));
                if(data.results && data.results.length > 0){
                    const location= data.results[0].geometry.location;
                    console.log(location);
                    
                }else{
                    console.error('No se encontró la dirección');
                }
            })
            .catch(error => console.error('Error al buscar la dirección', error));
            
        }

        nextStep();
    }


    

    useEffect(() => {
        const fetchData = async () => {

            const cities = await authService.getCity();
            setCities(cities)

            const specialities = await authService.getSpeciality();
            setSpecialities(specialities);
        }

        fetchData();

    }, [])



    return (
        <>
            <div className="mb-10">
                <Box >
                    <FormControl fullWidth>
                        <p className='mb-3 text-base font-light text-gray-700'>Ingresa tu especialidad</p>
                        <Select
                            required
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                                color: "black",
                                border: '0.25px solid rgba(255, 255, 255, 0.5)'
                            }}
                            className='mb-5'
                            value={specialityId}
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected == '') {
                                    return <em>Especialidad</em>;
                                }
                                const selectedSpecialityObj = specialities?.find(speciality => speciality.id === selected);
                                return selectedSpecialityObj ? <em>{selectedSpecialityObj.speciality_name}</em> : <em>Especialidad</em>;
                            }}
                            onChange={(event: SelectChangeEvent) => {
                                const selectedSpecialityObj = specialities?.find(speciality => speciality.id === event.target.value);
                                if (selectedSpecialityObj) {
                                    setSpecialityName(selectedSpecialityObj.speciality_name);
                                }
                                setSpecialityId(event.target.value);
                            }}
                        >
                            <MenuItem value={''}>Especialidad</MenuItem>
                            {
                                specialities && specialities.map((speciality) => (
                                    <MenuItem key={speciality.id} value={speciality.id}>
                                        <div className="p-2 bg-blue-200 mr-3 rounded-full">
                                            <DynamicIcon type={speciality.speciality_name} color="#3B82F6" />
                                        </div>
                                        <p>{speciality.speciality_name}</p>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>

                <Box >
                    <FormControl fullWidth>
                        <p className='mb-3 text-base font-light text-gray-700'>Ingresa tu ciudad</p>
                        <Select
                        required
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                                color: "black",
                                border: '0.25px solid rgba(255, 255, 255, 0.5)',
                            }}
                            value={cityId}
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected == '') {
                                    return <em>Ciudad</em>;
                                }
                                const selectedCityObj = cities?.find(city => city.id === selected);
                                return selectedCityObj ? <em>{selectedCityObj.city_name}</em> : <em>Ciudad</em>;
                            }}
                            onChange={(event: SelectChangeEvent) => {
                                const selectedCityObj = cities?.find(city => city.id === event.target.value);
                                if (selectedCityObj) {
                                    setCityName(selectedCityObj.city_name);
                                }
                                setCityId(event.target.value);
                            }}
                        >
                            <MenuItem value={''}>Ciudad</MenuItem>
                            {
                                cities && cities.map((city) => (
                                    <MenuItem key={city.id} value={`${city.id}`}>
                                        <div className="p-2 bg-blue-200 mr-3 rounded-full">
                                            <DynamicIcon type={"Casa"} color="#3B82F6" />
                                        </div>
                                        {city.city_name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box className='mb-4'>
                <p className='mb-3 text-base font-light text-gray-700'>Ingresa tu dirección</p>
                <div className='flex gap-4 items-center'>
                    <FormControl fullWidth>
                        {
                            location.latitude === 0 && location.longitude === 0 ? (
                                <TextField
                                    label="Dirección, Ciudad"
                                    value={address}
                                    fullWidth
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        classes: {
                                            input: 'placeholder-gray-500'
                                        }
                                    }}
                                />
                            ):(
                                <TextField
                                    label="Dirección, Ciudad"
                                    value={location.latitude+ ',' + location.longitude}
                                    fullWidth
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        classes: {
                                            input: 'placeholder-gray-500'
                                        }
                                    }}
                                />
                            )
                        }
                        
                    </FormControl>
                    <button className='cursor-pointer h-[56px] min-w-[110px] bg-gradient-to-r from-blue-300 to-blue-600 rounded-md text-white text-sm font-bold'
                     onClick={getCurrentLocation}
                    >
                        Direccion actual
                    </button>
                </div>
                </Box>
            </div>
            <div className="flex justify-end space-x-5" >
                <button
                    className='cursor-pointer min-w-40 flex justify-center p-4 rounded-md text-gray-500 font-semibold border border-gray-400'
                    onClick={() => prevStep()}
                >
                    Atras
                </button>
                <button
                    className='cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center p-4 rounded-md text-white font-bold'
                    onClick={() => {
                        if (specialityId && cityId) {
                            handleSubmit();
                        } else {
                            setIsError(true);
                        }
                    }}
                >
                    Siguiente
                </button>
            </div>
            <Modal isOpen={isError} onClose={() => setIsError(false)}>
                <div className="p-4 text-center mb-10">
                    <p className=" font-base">Por favor, rellena todos los campos del formulario</p>
                </div>
                <div className="flex items-center justify-center">

                    <button
                        className='cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center p-2 rounded-md text-white font-bold'
                        onClick={() => setIsError(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Step3RegisterProfessionalForm