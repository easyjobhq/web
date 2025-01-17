
import React from 'react'
import {
    Calendar,
    Clock,
    User,
    MapPin,
    CalendarCheck
} from 'lucide-react';

import { Appointment } from '@/interfaces/appoiment';
import Image from 'next/image';
import Link from 'next/link';
import { Client } from '@/interfaces/Client';
import { Service } from '@/interfaces/service';
import { Professional } from '@/interfaces/professional';
import Modal from './Modal';
import { FaMoneyBill } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { AppointmentDTOClient } from './AppointmentCard';
import { authService } from '@/services';

interface AppointmentCardProps {
    appointment: AppointmentDTOClient;
}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
};

const AppointmentCardProfessional: React.FC<AppointmentCardProps> = ({ appointment }) => {

    const appointmentDate = new Date(appointment.date);

    const [open, setOpen] = React.useState(false);

    const handleClickAccept = async() => {

        await authService.updateAppoimentStatus(appointment.id, 'accepted');

        setOpen(false);

        window.location.reload();
    }

    const handleClickReject = async() => {
        await authService.updateAppoimentStatus(appointment.id, 'rejected');

        setOpen(false);
    }

    const handleClickFinish = async() => {
        await authService.updateAppoimentStatus(appointment.id, 'completed');

        setOpen(false);

        window.location.reload();
    }


    return (
        <>
            <div
                className="bg-white cursor-pointer rounded-lg p-5 shadow-lg w-full border border-gray-300 space-y-2 transition-transform transform hover:scale-105 hover:shadow-2xl"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <div className='flex items-center justify-between mb-5'>
                    <div className="">
                        <p className="text-lg font-semibold">{appointment.client.name} {appointment.client.last_name}</p>
                        <p className="text-base font-light">{appointment.service.title} </p>
                    </div>
                    <div className='w-16 h-16 mr-5 relative'>
                        <Image className='rounded-full object-cover' src={appointment.client.photo_url} alt={appointment.client.name} layout='fill' />
                    </div>
                </div>
                {/* <p>{appointment.appointmentStatus.status}</p> */}
                <div className="h-[1px] bg-gray-300"></div>
                <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="font-light">{appointmentDate.toLocaleString('es-ES', options)}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="font-light">{appointment.hour}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={open} onClose={() => {
                setOpen(false);
            }}>

                <div className="flex flex-col w-full items-start">
                    <h2 className='font-bold text-2xl mb-10' >{appointment.service.title}</h2>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col space-y-2 text-sm mb-5">
                            <div className="flex items-center space-x-3 text-gray-700">
                                <Calendar className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="font-light">{appointmentDate.toLocaleString('es-ES', options)}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 text-gray-700">
                                <Clock className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="font-light">{appointment.hour}</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center space-x-3 text-gray-700">
                            <MapPin className="h-5 w-5 text-gray-600" />
                            <div>
                                <p className="font-light">{appointment.location}</p>
                            </div>
                        </div> */}
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                            <CalendarCheck className="h-5 w-5 text-gray-600" />
                            <div className="flex items-center space-x-2">
                                <span className={`inline-block w-3 h-3 rounded-full ${appointment.appointmentStatus.status === 'aceptada' ? 'bg-green-500' : appointment.appointmentStatus.status === 'pendiente' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                <p className="font-light capitalize">{appointment.appointmentStatus.status}</p>
                            </div>
                        </div>
                    </div>

                    <h3 className='font-semibold mb-3'>Vas a atender:</h3>
                    <div className="w-full flex items-center bg-white rounded-lg p-3 shadow-lg border border-gray-300 mb-5">
                        <Image className='w-14 h-14 rounded-full object-cover mr-5' src={appointment.client.photo_url} alt={appointment.professional.name} width={200} height={200} />
                        <p className='font-semibold'>{appointment.client.name} {appointment.client.last_name}</p>
                    </div>

                    <h3 className='font-semibold mb-3'>Detalles del servicio</h3>
                    <p className='flex items-center font-light mb-3'><FaMoneyBill className='mr-3' /> $ {appointment.service.price}</p>
                    <div className='space-y-8'>
                        <p className='font-light text-left'>{appointment.service.description}</p>
                        

                        <div className='w-full'>
                            {appointment.appointmentStatus.status === 'pending' ? (
                                <div className='flex items-center justify-center space-x-5'>
                                    <button
                                        className='flex-1 bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-600 hover:to-blue-900 flex justify-center text-white border-blue-500 rounded-md p-2'
                                        onClick={handleClickAccept}
                                    > 
                                        <p className='text-white font-bold'>Aceptar</p>
                                        
                                    </button>
                                    
                                    <button
                                        className='flex-1 bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-600 hover:to-blue-900 flex justify-center text-white border-blue-500 rounded-md p-2'
                                        onClick={handleClickReject}
                                    >
                                        <p className='text-white font-bold'>Rechazar</p>
                                    </button>

                                </div>
                                
                            ): appointment.appointmentStatus.status === 'accepted' ? (
                                <div className='flex items-center justify-center space-x-5'>
                                    <button
                                        className='flex-1 bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-600 hover:to-blue-900 flex justify-center text-white border-blue-500 rounded-md p-2'
                                        onClick={handleClickFinish}
                                    >
                                        <p className='text-white font-bold'>Finalizar</p>
                                    </button>
                                </div>
                            ):(
                                <></>
                            )}
                        </div>
                    </div>

                </div>

            </Modal>
        </>
    )
}

export default AppointmentCardProfessional
