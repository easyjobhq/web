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

export interface AppointmentDTOClient {
    id: string,
    date: Date,
    location: string,
    hour: string,
    service: Service,
    client: Client,
    professional: Professional,
    appointmentStatus: AppointmentStatus
}


interface AppointmentCardProps {
    appointment: AppointmentDTOClient;
}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {

    const appointmentDate = new Date(appointment.date);


    return (
        <div className="bg-white rounded-lg p-5 shadow-lg w-[48%] border border-gray-300 space-y-2">
            <div className='flex items-center justify-between mb-5'>
                <div className="">
                    <p className="text-lg font-semibold">{appointment.professional.name} {appointment.professional.last_name}</p>
                    <p className="text-base font-light">{appointment.service.title} </p>
                </div>
                <div className='w-16 h-16 mr-5 relative'>
                    <Image className='rounded-full object-cover' src={appointment.professional.photo_url} alt={appointment.professional.name} layout='fill' />
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
    )
}

export default AppointmentCard
