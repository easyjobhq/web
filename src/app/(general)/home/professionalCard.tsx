'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Professional } from '@/interfaces/professional';
import "./professionalCard.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { authService } from '@/services';
import { Service } from '@/interfaces/service';
import { BiDollar } from "react-icons/bi";
import { City } from '@/interfaces/city';
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { Speciality } from '@/interfaces/speciality';
import { Rating } from '@mui/material';

interface ProfessionalProps {
  professional: Professional;
}

function ProfessionalCard(props: ProfessionalProps) {

  const starPercentage = (props.professional.score / 5) * 100;
  const starRating = `${Math.round(starPercentage / 10) * 10}%`;
  const [services, setServices] = useState<Service[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [formsRating, setFormsRating] = useState<number>(0.0);
  
  const displayValue = isNaN(formsRating) ? 0 : formsRating;
  
  useEffect(() => {
    const fetchData = async () => {
      const responseServices = await authService.getServicesOfProfessional(props.professional.id);
      setServices(responseServices);

      const responseCities = await authService.getCitiesOfProfessional(props.professional.id);
      setCities(responseCities);

      const responseSpecialities = await authService.getSpecialitiesOfProfessional(props.professional.id);
      setSpecialities(responseSpecialities);

      const responseRating = await authService.getTotalReview(props.professional.id);
      console.log(responseRating)
      setFormsRating(responseRating);

      

    }

   


    fetchData();
    
  }, [])

  return (
    <div className=" bg-white mb-3 rounded-lg px-8 py-5 shadow-md flex">
      <div className='w-[95%] flex justify-between flex-wrap'>
        <div className="left-section-card w-full lg:w-6/12 pr-5">
          <div className="upper-section flex mb-2">
            <Image
              src={props.professional.photo_url || ""}
              alt=""
              width={200}
              height={200}
              className='object-cover rounded-full m-1 w-24 h-24'
            />
            <div className='p-5'>
              <h2 className="font-semibold text-xl hover:underline">
                <Link
                  href={`/professional/${props.professional.id}`}>
                  {props.professional.name} {props.professional.last_name}
                </Link>
              </h2>
              <p className='text-sm font-light'>
                {specialities && specialities.length > 0 ? (
                  specialities.map((speciality, index) => (
                    <>
                      {speciality.speciality_name} {index < specialities.length - 1 ? ', ' : ''}
                    </>
                  ))
                ) : (
                  "Sin profesion"
                )}
              </p>

              <div className='hidden sm:flex justify-left items-center'>
                <Rating 
                name="read-only" 
                value={formsRating} 
                readOnly 
                precision={0.1} 
                size='small' />
                <div className="ml-2 text-sm font-light">{`(${displayValue})`}</div>
              </div>
            </div>
          </div>
          <div className='flex sm:hidden justify-left items-center mb-3'>
                <div className='stars-outer'>
                  <div className='stars-inner' style={{ width: `${starRating}` }}>
                    ★ ★ ★ ★ ★
                  </div>
                </div>
                <div className="ml-2 text-sm font-light">{`(${displayValue})`}</div>
              </div>
          <div className='bg-gray-300 w-full pr-3' style={{ height: "0.25px" }}></div>
          <div className="medium-section pt-3 pl-3 flex items-center">
            <FaPhoneAlt className='mr-2 h-3' />
            <p className='text-sm font-light'  > +57 {props.professional.phone_number}</p>
          </div>
          <div className="medium-section pl-3 flex items-center">
            <FaMapMarkerAlt className='mr-2 h-3' />
            <p className='text-sm font-light'  >
              {
                cities.map((city, index) => (
                  index < cities.length - 1 ? (`${city.city_name}, `) : (`${city.city_name}`)
                ))
              }
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex w-full lg:w-6/12 pt-4 sm:pt-0">
          <div className='bg-gray-300 h-full hidden lg:block' style={{ width: "0.25px" }}></div>
          <div className='pl-5 sm:pl-7 pt-2'>
            <div>
              {
                services.length === 0 ? (
                  <p className='text-sm font-light'>Este profesional no tiene servicios :(</p>
                ) : (
                  services.slice(0, 2).map((service) =>
                    <div className='mb-3' key={service.id}>
                      <h4 className='mb-0.5 font-semibold'>{service.title}</h4>
                      <p className='text-sm font-light'>{service.description}</p>
                      <p className='text-sm font-normal flex items-center' > <BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="w-5 flex items-center">
        <Link
          href={`/professional/${props.professional.id}`}>
          <SlArrowRight className='w-5' />
        </Link>
      </div>
    </div>
  )
}

export default ProfessionalCard