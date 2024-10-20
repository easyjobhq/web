"use client"

import { authService } from '@/services';
import React, { useState } from 'react'

function page() {

    const [email, setEmail] = useState<string>("");
    const [responseStatus, setResponseStatus] = useState(0);

    async function handleSubmit() {
        const response = await authService.restorePassword(email)
        if (response) setResponseStatus(1)
        else setResponseStatus(2)
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-slate-100">
            <div className="flex flex-col border w-full max-w-md px-10 pb-10 pt-7 rounded-md shadow-md bg-white">
                <div className="font-bold flex mb-5 text-center justify-center items-center">
                    <p className='text-2xl'>Recuperación de contraseña</p>
                </div>

                <p className='font-light text-sm mb-5' >Te enviaremos un mensaje a tu correo registrado para que puedas volver a acceder a tu cuenta</p>
                <label className=' text-left mb-2 font-medium'>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 border border-solid border-black rounded"
                    placeholder="Email"
                />

                <button
                    onClick={handleSubmit}
                    className="h-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
                >
                    Enviar correo
                </button>

                <div className="flex mt-8 items-center justify-center ">
                {
                    responseStatus === 1 ? (
                        <div>
                            <p className='text-green-500'>Correo enviado correctamente :)</p>
                        </div>
                    ) : responseStatus === 2 ? (
                        <div>
                            <p className='text-red-500'>El correo no pudo ser enviado correctamente :(</p>
                        </div>
                    ): (
                        <></>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default page