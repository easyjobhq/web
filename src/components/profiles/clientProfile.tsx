import { Client } from "@/interfaces/Client"
import React, { ChangeEvent } from "react"
import { useState, useEffect } from "react"
import { authService } from "@/services"
import Image from "next/image"
import { MdOutlineAddAPhoto } from "react-icons/md"
//import '../../../home/professionalCard.css'
import { FaSave } from "react-icons/fa"
import { Rating } from "@mui/material"
import {
    Calendar,
    Clock,
    User,
    MapPin,
    CalendarCheck
} from 'lucide-react';
import AppointmentCard from "../ui/AppointmentCard"
import ReviewCard from "../ui/ReviewCard"
import WhiteButton from "../ui/WhiteButton"

interface ClientInformation {
    id: string
}


const ProfileCliPage: React.FC<ClientInformation> = ({ id }) => {

    const [client, setClient] = useState<Client>();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [photo, setPhoto] = useState<File | null>(null)

    const [name, setName] = useState<string | undefined>(client?.name || '')
    const [last_name, setLastName] = useState<string | undefined>(client?.last_name || '')
    const [email, setEmail] = useState<string | undefined>(client?.email || '');
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(client?.phone_number || '');


    const handleEmailChange = () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, null)
        window.location.reload();

    }
    const handlePhoneNumberChange = () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, null)
        window.location.reload();
    }
    const handleNameChange = () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, null)
        window.location.reload();
    }
    const handleLastNameChange = () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, null)
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await authService.getMe(id);
            setClient(response);
            setName(response.name);
            setLastName(response.last_name);
            setEmail(response.email);
            setPhoneNumber(response.phone_number);
        }
        fetchData();
    }, [])

    const onChangePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {

            setPhoto(event.target.files[0]);
        }
    }

    const ChangeImage = async () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, photo)
        //window.location.reload();
    }

    return (
        <>
            <div className="w-3/5 mr-2">
                <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                    <div className="flex">
                        <div
                            className="relative photo-container mr-5 w-40 h-40"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Image
                                src={client?.photo_url || ""}
                                alt=""
                                width={200}
                                height={200}
                                className="object-cover w-full h-full rounded-md"
                            />
                            {isHovered && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                                    <input onChange={onChangePhoto} className="w-full shadow-inner p-4 border-0" type="file" name="photo" placeholder="-99.1405168"></input>
                                </div>
                            )}

                        </div>

                        <div className="client-information">
                            <h2 className='font-semibold text-2xl mt-3 mb-1'>{client?.name} {client?.last_name} </h2>
                        </div>
                    </div>
                    <button type="submit" className="font-light w-1/4 mt-3 mb-2 border border-gray-400 rounded-md  flex justify-center items-center" onClick={ChangeImage}>
                        Cambiar foto <MdOutlineAddAPhoto className='ml-3 text-gray-600' />
                    </button>
                </div>
                <div className="bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                    <div className="container px-6 py-8 mx-auto">
                        <h2 className="text-2xl font-semibold">Detalles del perfil</h2>
                        <form>
                            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="" htmlFor="name">Nombre</label>
                                    <div className="flex">
                                        <input onChange={(event) => { setName(event.target.value) }} value={name} id="name" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                        <button onClick={handleNameChange} className="px-3 text-lg tracking-wide text-gray-500  " type="button"><FaSave /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="" htmlFor="last_name">Apellido</label>
                                    <div className="flex">
                                        <input onChange={(event) => { setLastName(event.target.value) }} value={last_name} id="last_name" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                        <button onClick={handleLastNameChange} className="px-3 text-lg tracking-wide text-gray-500  " type="button"><FaSave /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="" htmlFor="emailAddress">Correo electrónico</label>
                                    <div className="flex">
                                        <input onChange={(event) => { setEmail(event.target.value) }} value={email} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                        <button onClick={handleEmailChange} className="px-3 text-lg tracking-wide text-gray-500  " type="button"><FaSave /></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="" htmlFor="phoneNumber">Teléfono</label>
                                    <div className="flex">
                                        <input onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} id="phoneNumber" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                        <button onClick={handlePhoneNumberChange} className="px-3 text-lg tracking-wide text-gray-500  " type="button"><FaSave /></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-2/5">
                <div className="bg-white mb-3 rounded-lg shadow-md w-full space-y-4">
                    <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                        <h3 className="ml-3 text-xl">Tus citas agendadas</h3>
                    </div>
                    <div className="pt-3 pb-8 px-10">
                        {client?.appointments.length !== 0 ? (
                            client?.appointments
                                // .filter(appoiment => new Date(appoiment.date) >= new Date())
                                // .sort((a,b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
                                // .slice(0,10)
                                .map((appointment, index) => (
                                    <AppointmentCard key={index} appointment={appointment} ></AppointmentCard>
                                ))
                        ) : (
                            <>
                                <p className="text-gray-500 mt-4 text-lg font-bold">No tiene citas agendadas aún.</p>
                            </>
                        )}

                        <WhiteButton title={"Ver mas"} onClick={function (): void {
                            throw new Error("Function not implemented.")
                        }} />

                    </div>
                </div>
                <div className="bg-white mb-3 rounded-lg shadow-md w-full space-y-4">

                    <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                        <h3 className="ml-3 text-xl">Tus reseñas</h3>
                    </div>
                    <div className="pt-3 pb-8 px-10">
                        {client?.reviews.length !== 0 ? (
                            client?.reviews.slice(-10).map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))
                        ) : (
                            <p className="text-gray-500 mt-4 text-lg font-bold">No tiene reseñas aún.</p>
                        )}

                        <WhiteButton title={"Ver mas"} onClick={function (): void {
                            throw new Error("Function not implemented.")
                        }} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProfileCliPage;