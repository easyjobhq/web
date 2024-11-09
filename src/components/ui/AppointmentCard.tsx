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


interface AppointmentCardProps {
  appointment: Appointment;
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
    <div className="bg-white mb-3 rounded-lg p-3 shadow-md w-full border border-gray-200 space-y-2">
        <Link href={`/professional/${appointment.professional.id}`} className='flex items-center'>
            <Image className=' rounded-full w-12 mr-5' src={appointment.professional.photo_url} alt={appointment.professional.name} width={100} height={100} />
            <p className="text-lg font-normal">{appointment.professional.name} {appointment.professional.last_name}</p>
        </Link>
        <div className="h-[1px] bg-gray-200 "></div>
        <div className="flex space-x-6">
            <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                    <p className="font-medium">{appointmentDate.toLocaleString('es-ES', options)}</p>
                </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-700">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                    <p className="font-medium">{appointment.hour}</p>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default AppointmentCard
