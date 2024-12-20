"use client"

import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRegister } from '@/hooks/auth/useRegister'
import { City } from '@/interfaces/city'
import { Service } from '@/interfaces/service'
import { Language } from '@/interfaces/language'
import { Speciality } from '@/interfaces/speciality'
import { authService } from '@/services'
import Link from 'next/link'
import { useRegisterProfessionalContext } from '@/context/RegisterProfessional'
import Step1RegisterProfessionalForm from './Step1RegisterProfessionalForm'
import Step2RegisterProfessionalForm from './Step2RegisterProfessionalForm'
import Step3RegisterProfessionalForm from './Step3RegisterProfessionalForm'
import Step4RegisterProfessionalForm from './Step4RegisterProfessionalForm'

function RegisterProfessional() {

    const router = useRouter();
    const { register } = useRegister()

    const {
        name,
        lastName,
        email,
        phoneNumber,
        password,
        photo,
        cityId,
        specialityId,
        step,
        nextStep,
        prevStep,
    } = useRegisterProfessionalContext();

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        event.preventDefault();
        if (!name || !lastName || !email || !password || !cityId  || !specialityId) {
            alert("All fields are required");
        } else {
            await register(name, lastName, email, phoneNumber, password, photo, "", "", cityId, specialityId,  "Prof")
                .then(() => router.push("/login"))
                .catch((e: Error) => alert(e));
        }
    }
    

    return (

        <section className="p-16 shadow-md bg-white rounded-2xl max-w-screen-sm">
            

        <div className="md:flex">
            <h2 className="tracking-wide font-semibold mb-6 text-2xl">Crear Perfil Profesional</h2>
        </div>
        <form>
            {step == 1 ? <Step1RegisterProfessionalForm /> : ""}
            {step == 2 ? <Step2RegisterProfessionalForm /> : ""}
            {step == 3 ? <Step3RegisterProfessionalForm /> : ""}
            {step == 4 ? <Step4RegisterProfessionalForm onSubmit={onSubmit} /> : ""}

            <div className="md:flex mb-8">
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">

                    <div className="w-full h-[1px] bg-slate-200 my-5"></div>

                    <div className="flex items-center justify-center">
                        <p className='text-sm font-light mt-4 mr-1'>¿Eres cliente?</p>
                        <Link href={"/register-professional"} className='text-sm font-normal mt-4 text-center text-blue-700 hover:underline'> Registrate como cliente</Link>
                    </div>

                </div>
            </div>
        </form>
    </section>
    )
}

export default RegisterProfessional;
