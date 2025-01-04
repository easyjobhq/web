'use client'

import { useRegisterClientContext } from '@/context/RegisterClient';
import { makeStyles, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRegisterProfessionalContext } from '@/context/RegisterProfessional';
import validateSchemas from '@/app/actions/validateSchemas2';

interface FormErrors {
    phoneNumber?: string[];
    _form?: string[];
}

function Step2RegisterProfessionalForm() {


    const {
        nextStep,
        prevStep,
        phoneNumber,
        setPhoneNumber,
        photo,
        setPhoto
    } = useRegisterProfessionalContext();

    const [errors, setErrors] = React.useState<FormErrors>({});


    useEffect(() => {
        if (photo) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(photo);
        }
    }, [photo]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPhoto(null);
    };

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async () =>{
        const formData = new FormData()
        formData.append('phoneNumber', phoneNumber)
        console.log(phoneNumber)

        const validationResult = await validateSchemas({ errors: {} }, formData);
        console.log(validationResult)
        if (Object.keys(validationResult.errors).length > 0) {
            setErrors(validationResult.errors);
        } else {
            setErrors({});
            nextStep();
        }

        

    }


    return (
        <>
            <div className="mb-10">
                <p className='mb-3 text-base font-light text-gray-700'>Ingresa tu foto de perfil</p>
                <div className="w-full mb-5">
                    <div
                        className={`relative border-2 border-dashed ${imagePreview ? "border-green-400" : "border-gray-300"
                            } rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition`}
                    >
                        {!imagePreview ? (
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center h-40 cursor-pointer"
                            >
                                <div className="text-center">
                                    <span className="text-gray-500 block font-medium">
                                        Arrastra y suelta o haz clic para subir
                                    </span>
                                    <span className="text-sm text-gray-400 block">
                                        (JPEG, PNG, Max 5MB)
                                    </span>
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Uploaded Preview"
                                    className="rounded-md w-full h-40 object-cover"
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                                >
                                    <IoClose />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <p className='mb-3 text-base font-light text-gray-700'>Ingresa tu numero de telefono</p>
                    <TextField
                        fullWidth
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+57</InputAdornment>,
                        }}
                        error= {Boolean(errors.phoneNumber)}
                        helperText = {errors.phoneNumber?.join(", ")}
                    />
                </div>
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
                    onClick={handleSubmit}
                    type='button'
                >
                    Siguiente
                </button>
            </div>
        </>
    )
}

export default Step2RegisterProfessionalForm