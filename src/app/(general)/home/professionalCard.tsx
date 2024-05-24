import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import kanye from "@/../public/kanye.jpg";
import { Professional } from '@/interfaces/professional';
import "./professionalCard.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { authService } from '@/services';
import { Service } from '@/interfaces/service';
import { BiDollar } from "react-icons/bi";

interface ProfessionalProps {
  professional: Professional;
}

function ProfessionalCard(props: ProfessionalProps) {

  const starPercentage = (props.professional.score /5) * 100;
  const starRating = `${Math.round(starPercentage/10) *10}%`; 
  const [services, setServices] = useState<Service[]>([]);


  useEffect( () => {
    const fetchData = async () => {
      const response = await authService.getServicesOfProfessional(props.professional.id);
      setServices(response);
      console.log(response)
    }  

    fetchData();
  }, [])
  
  console.log(starRating + "%")

  return (
    <div className=" bg-white mb-3 rounded-lg px-8 py-5 shadow-md flex">
      <div className="left-section-card w-3/5 pr-5">
        <div className="upper-section flex mb-2">
          <Image
          src={kanye}
          alt=""  
          width={110}
          height={110}
          className='rounded-full m-1'
          />
          <div className='p-5'>
            <h2 className="font-semibold text-xl">{props.professional.name} {props.professional.last_name}</h2>
            <p className='text-sm font-light'>Poner la profesion</p>
            <div className='flex justify-center items-center'>
              <div className='stars-outer'>
                <div className='stars-inner' style={{width: `${starRating}`}}>
                ★ ★ ★ ★ ★
                </div>
              </div>
              <div className="ml-2 text-sm font-light">{`(${props.professional.score})`}</div>
            </div>
          </div>
        </div>
        <div className='bg-gray-300 w-full pr-3' style={{height: "0.25px"}}></div>
        <div className="medium-section pt-3 pl-3 flex items-center">
          <FaPhoneAlt className='mr-2 h-3'/>
          <p className='text-sm font-light'  > +57 {props.professional.phone_number}</p>
        </div>
        <div className="medium-section pl-3 flex items-center">
          <FaMapMarkerAlt className='mr-2 h-3'/>
          <p className='text-sm font-light'  > Cali, Valle del Cauca</p>
        </div>
      </div>

      {/* Right section */}
      <div className="w-2/5 flex">
        <div className='bg-gray-300 h-full' style={{width: "0.25px"}}></div>
        <div className='pl-7 pt-2'>
          <div>
            {
                services.slice(0,2).map((service) => 
                  <div className='mb-3'>
                    <h4 className='mb-0.5 font-semibold'>{service.title}</h4>
                    <p className='text-sm font-light'>{service.description}</p>
                    <p className='text-sm font-light flex items-center' > <BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                  </div>
                )
              }
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ProfessionalCard