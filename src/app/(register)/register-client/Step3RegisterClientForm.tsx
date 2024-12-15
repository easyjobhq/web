import { useRegisterClientContext } from '@/context/RegisterClient';
import Image from 'next/image';
import React from 'react'

function Step3RegisterClientForm() {

    const {
        name,
        lastName,
        email,
        password,
        phoneNumber,
        photo,
        nextStep,
        prevStep
    } = useRegisterClientContext();

    return (
        <div>
            <p className='mb-3 text-base font-light text-gray-700'>Resumen del perfil</p>
            <div className="mb-12 space-y-4 border p-10 rounded-lg shadow-md">
                {/* Photo */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Foto de Pefil:</span>
                    <div className="flex flex-col items-start">
                        {photo ? (
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="Uploaded Profile"
                                className="w-16 h-16 rounded-full object-cover border border-gray-300"
                            />
                        ) : (
                            <Image src={'/profile-picture.png'} alt={''} width={200} height={200} className='w-16 h-16'/>
                        )}
                    </div>
                </div>

                {/* Nombre */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Nombre:</span>
                    <span className="text-gray-800">{name}</span>
                </div>

                {/* Apellido */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Apellido:</span>
                    <span className="text-gray-800">{lastName}</span>
                </div>

                {/* Correo Electrónico */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Correo Electrónico:</span>
                    <span className="text-gray-800">{email}</span>
                </div>

                {/* Contraseña */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Contraseña:</span>
                    <span className="text-gray-800">
                        {password.replace(/./g, "•")} {/* Masked Password */}
                    </span>
                </div>

                {/* Número de Teléfono */}
                <div className="flex justify-between items-center">
                    <span className="font-base text-gray-600">Número de Teléfono:</span>
                    <span className="text-gray-800">+57 {phoneNumber}</span>
                </div>

            </div>
            <div className="flex justify-end space-x-5" >
                <button
                    className='cursor-pointer min-w-40 flex justify-center p-4 rounded-md text-gray-500 font-semibold border border-gray-400'
                    onClick={() => prevStep()}
                >
                    Atrás
                </button>
                <button
                    className='cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center p-4 rounded-md text-white font-bold'
                    onClick={() => nextStep()}
                >
                    Crear perfil
                </button>
            </div>
        </div>
    )
}

export default Step3RegisterClientForm