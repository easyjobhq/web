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

function Register() {

    const [name, setName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [photo, setPhoto] = useState<File | null>(null)
    const [photo_url, setPhotoUrl] = useState("")
    const [password, setPassword] = useState("")
    const [selectedOption, setSelectedOption] = useState('')
    const [serviceId, setServiceId] = useState('')
    const [cityId, setCityId] = useState('')
    const [languageId, setLanguageId] = useState('')
    const [specialityId, SetSpecialityId] = useState('')
    const [services, setServices] = useState<Service[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [language, setLanguage] = useState<Language[]>([]);
    const [speciality, SetSpeciality] = useState<Speciality[]>([])
    const router = useRouter();
    const { register } = useRegister()

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

        <section className=" p-4 shadow-md bg-white rounded-lg">
            <div className="md:flex">
                <h2 className="md:w-1/3 tracking-wide font-semibold mb-6 ml-2 text-2xl">Crea tu perfil cliente</h2>
            </div>
            <form>
                <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div className="mb-4">
                            <label className="block tracking-wide text-md ">Nombre</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className=" bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="name" placeholder="Juan"></input>
                        </div>
                        <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                                <label className="block tracking-wide text-charcoal-darker text-md">Apellido</label>
                                <input value={last_name} onChange={(e) => setLastName(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="last_name" placeholder="Perez"></input>
                            </div>
                            <div className="md:flex-1 md:pl-3">
                                <label className="block tracking-wide text-charcoal-darker text-md">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="text" name="email" placeholder="juanperez@gmail.com"></input>
                            </div>
                        </div>
                        <div className="md:flex mb-4">
                            <div className="md:flex-1 md:pr-3">
                                <label className="block tracking-wide text-charcoal-darker text-md">Telefono Celular</label>
                                <input value={phone_number} onChange={(e) => setPhone(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="tel" name="tel" placeholder="+57 3181234567"></input>
                            </div>
                            <div className="md:flex-1 md:pl-3">
                                <label className="block tracking-wide text-charcoal-darker text-md">Foto</label>
                                <input onChange={handleFileChange} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="file" name="photo" placeholder="-99.1405168"></input>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block tracking-wide text-md ">Constraseña</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 w-full shadow-inner p-4 border-0" type="password" name="pass" placeholder="****"></input>
                        </div>
                        {/* <div className="md:flex mb-4 items-center justify-center">
                            <label htmlFor="user" className="block mb-2 text-sm w-40 ">Rol del usuario</label>
                            <select id="countries" className="border text-sm rounded-lg p-4 w-full shadow-inner bg-gray-100" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="">Elige tu rol</option>
                                <option value="Prof">Professional</option>
                                <option value="Cli">Client</option>
                            </select>
                        </div>
                        {selectedOption === "Prof" && (
                                <>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="service" className="block mb-2 text-sm font-medium w-40">Elije un servicio</label>
                                        <select
                                            id="services"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={serviceId}
                                            onChange={(e) => setServiceId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="language" className="block mb-2 text-sm font-medium w-40">Elige un idioma</label>
                                        <select
                                            id="languages"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={languageId}
                                            onChange={(e) => setLanguageId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {language.map(language => (
                                                <option key={language.id} value={language.id}>
                                                    {language.language_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium w-40">Elige una ciudad</label>
                                        <select
                                            id="cities"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={cityId}
                                            onChange={(e) => setCityId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {cities.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.city_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:flex mb-4">
                                        <label htmlFor="speciality" className="block mb-2 text-sm font-medium w-40">Elige una especialidad </label>
                                        <select
                                            id="specialities"
                                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={specialityId}
                                            onChange={(e) => SetSpecialityId(e.target.value)}
                                        >
                                            <option value=""></option>
                                            {speciality.map(speciality => (
                                                <option key={speciality.id} value={speciality.id}>
                                                    {speciality.speciality_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )} */}
                        <button type="submit" className="w-full mt-3 text-cream-lighter bg-brick bg-blue-500 text-white font-semibold p-3 rounded-md" onClick={onSubmit}>
                            Crear perfil
                        </button>
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
