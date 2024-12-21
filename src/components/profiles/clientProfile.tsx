import { Client } from "@/interfaces/Client"
import React, { ChangeEvent } from "react"
import { useState, useEffect } from "react"
import { authService } from "@/services"
import Image from "next/image"
import { MdOutlineAddAPhoto } from "react-icons/md"
import { FaSave } from "react-icons/fa"
import { Rating } from "@mui/material"
import {
    Calendar,
    Clock,
    User,
    MapPin,
    CalendarCheck
} from 'lucide-react';
import AppointmentCard, { AppointmentDTOClient } from "../ui/AppointmentCard"
import ReviewCard from "../ui/ReviewCard"
import WhiteButton from "../ui/WhiteButton"
import { Appointment } from "@/interfaces/appoiment"
import { useCurrentUser } from "@/hooks/auth/useCurrentUser"

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

    const [appointments, setAppointments] = useState<AppointmentDTOClient[]>([]);

    //Selector 
    const [selectedState, setSelectedState] = useState<string>("Pendiente");


    const handleFormChange = () => {
        authService.updateClients(id, name, last_name, email, phoneNumber, null)
        window.location.reload();

    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await authService.getMe(id);
            const appointments = await authService.getAppointmentsOfClient(id);
            setAppointments(appointments);
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
                <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-full">
                    <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                        <h3 className="ml-3 text-xl">Datos basicos</h3>
                    </div>
                    <div className="flex p-8">
                        <div className="mr-5">
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

                            <button type="submit" className="w-40 font-medium py-1 px-2 mt-4 mb-2 border-2 border-blue-500 rounded-md flex justify-center items-center text-blue-500" onClick={ChangeImage}>
                                Cambiar foto <MdOutlineAddAPhoto className='ml-3 text-blue-500' />
                            </button>
                        </div>

                        <div className="client-information">
                            <h2 className='font-semibold text-2xl mt-3 mb-1'>{client?.name} {client?.last_name} </h2>
                            <div>
                                <form>
                                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                                        <div>
                                            <label className="font-light text-sm" htmlFor="name">Nombre</label>
                                            <div className="flex">
                                                <input onChange={(event) => { setName(event.target.value) }} value={name} id="name" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-light text-sm" htmlFor="last_name">Apellido</label>
                                            <div className="flex">
                                                <input onChange={(event) => { setLastName(event.target.value) }} value={last_name} id="last_name" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-light text-sm" htmlFor="emailAddress">Correo electrónico</label>
                                            <div className="flex">
                                                <input onChange={(event) => { setEmail(event.target.value) }} value={email} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-light text-sm" htmlFor="phoneNumber">Teléfono</label>
                                            <div className="flex">
                                                <input onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} id="phoneNumber" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                            </div>
                                        </div>
                                    </div >
                                    <div className="w-full flex justify-end mt-2">
                                        <button
                                            onClick={handleFormChange}
                                            className="z-10 mt-5 cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                                        >
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white mb-3 rounded-lg shadow-md w-full">
                    <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                        <h3 className="ml-3 text-xl">Tus citas agendadas</h3>
                    </div>
                    <div className="p-8">
                        <div className="flex mb-3 space-x-4">
                            <div
                                className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'Pendiente' ? 'bg-blue-500 text-white' : 'border'}`}
                                onClick={() => setSelectedState('Pendiente')}
                            >
                                Pendientes
                            </div>
                            <div
                                className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'Aceptada' ? 'bg-blue-500 text-white' : 'border'}`}
                                onClick={() => setSelectedState('Aceptada')}
                            >
                                Aceptadas
                            </div>
                            <div
                                className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'Terminada' ? 'bg-blue-500 text-white' : 'border'}`}
                                onClick={() => setSelectedState('Terminada')}
                            >
                                Terminadas
                            </div>
                        </div>
                        <div className="h-[1px] bg-gray-300 mb-5"></div>
                        <div className="flex flex-wrap gap-4">
                            {appointments.length !== 0 ? (
                                appointments
                                    .filter(appointment => appointment.appointmentStatus?.status.toLowerCase() === selectedState.toLowerCase())
                                    .length === 0 ? (
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <Image className="opacity-50" src={'/icons/screwdriver_icon.png'} alt="Screwdriver icon" width={200} height={200} />
                                        <p className="text-gray-500 mt-4 text-lg font-base">No tiene citas agendadas en este estado.</p>
                                    </div>
                                ) : appointments.map((appointment, index) => (
                                    <AppointmentCard key={index} appointment={appointment} ></AppointmentCard>
                                ))

                            ) : (
                                <div className="w-full flex flex-col items-center justify-center">
                                    <Image className="opacity-50" src={'/icons/screwdriver_icon.png'} alt="Screwdriver icon" width={200} height={200} />
                                    <p className="text-gray-500 mt-4 text-lg font-base">No tiene citas agendadas aún.</p>
                                </div>
                            )}
                        </div>
                        {/* <button
                            onClick={() => {
                                alert("TO BE DONE")
                            }}
                            className="w-full z-10 mt-5 cursor-pointer min-w-40 bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                        >
                            Ver Mas
                        </button> */}
                    </div>
                </div>
            </div>
            <div className="w-2/5">
                <div className="bg-white mb-3 rounded-lg shadow-md w-full">

                    <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                        <h3 className="ml-3 text-xl">Tus reseñas</h3>
                    </div>
                    <div className="p-8">
                        {client?.reviews.length !== 0 ? (
                            client?.reviews.slice(-3).map((review, index) => (
                                <ReviewCard key={index} review={review} />
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center">
                                <Image className="opacity-50" src={'/icons/screwdriver_icon.png'} alt="Screwdriver icon" width={200} height={200} />
                                <p className="text-gray-500 mt-4 text-lg font-base">No tiene reseñas aun</p>
                            </div>
                        )}

                        {/* <button
                            onClick={() => {
                                alert("TO BE DONE")
                            }}
                            className="mt-5 cursor-pointer min-w-40 w-full bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                        >
                            Ver Mas
                        </button> */}
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProfileCliPage;