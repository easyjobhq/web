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

    const [isError, setIsError] = React.useState(false);
    

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
                            nextStep();
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