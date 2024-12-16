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
import { useRegisterClientContext } from '@/context/RegisterClient'
import Step1RegisterClientFrom from './Step1RegisterClientForm'
import Step2RegisterClientForm from './Step2RegisterClientForm'
import Step3RegisterClientForm from './Step3RegisterClientForm'

function Register() {

    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [photo, setPhoto] = useState<File | null>(null)
    const [password, setPassword] = useState("")
    const [services, setServices] = useState<Service[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [language, setLanguage] = useState<Language[]>([]);
    const [speciality, SetSpeciality] = useState<Speciality[]>([])
    const router = useRouter();
    const { register } = useRegister()

    //Context for the register form

    const { step, nextStep, prevStep } = useRegisterClientContext();


    useEffect(() => {
        const fetchData = async () => {

            const services = await authService.getServices();
            setServices(services);

            const language = await authService.getLanguage();
            setLanguage(language)

            const city = await authService.getCity();
            setCities(city)

            const speciality = await authService.getSpeciality();
            SetSpeciality(speciality);
        }

        fetchData();

    }, [])

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
        }
    };

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {


        event.preventDefault();
        if (!name || !last_name || !email || !phone_number || !password || !photo) {
            alert("All fields are required");
        } else {
            await register(name, last_name, email, phone_number, password, photo, "", "", "", "", "Client")
                .then(() => router.push("/login"))
                .catch((e: Error) => alert(e));
        }
    }

    return (

        <section className=" p-16 shadow-md bg-white rounded-2xl">
            

            <div className="md:flex">
                <h2 className="tracking-wide font-semibold mb-6 text-2xl">Crear Perfil</h2>
            </div>
            <form>
                {step == 1 ? <Step1RegisterClientFrom /> : ""}
                {step == 2 ? <Step2RegisterClientForm /> : ""}
                {step == 3 ? <Step3RegisterClientForm /> : ""}
                <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">


                        {/* <button
                            type="submit"
                            className="w-full mt-3 text-cream-lighter bg-brick bg-blue-500 text-white font-semibold p-3 rounded-md"
                            onClick={onSubmit}
                        >
                            Crear perfil
                        </button> */}

                        <div className="w-full h-[1px] bg-slate-200 my-5"></div>

                        <div className="flex items-center justify-center">
                            <p className='text-sm font-light mt-4 mr-1'>¿Eres profesional?</p>
                            <Link href={"/register-professional"} className='text-sm font-normal mt-4 text-center text-blue-700 hover:underline'> Registrate como profesional</Link>
                        </div>

                    </div>
                </div>
            </form>
        </section>
    )
}

export default Register;
