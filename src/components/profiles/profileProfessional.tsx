'use client'

import { City } from '@/interfaces/city'
import { Professional } from '@/interfaces/professional'
import { Service } from '@/interfaces/service'
import { Speciality } from '@/interfaces/speciality'
import { authService } from '@/services'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Question } from '@/interfaces/question'
import { Review } from '@/interfaces/review'
import ReviewCard from '../../app/(general)/professional/[id]/ReviewCard'
import { Box, Button, FormControl, MenuItem, Rating, Select, SelectChangeEvent } from '@mui/material'
import { MdOutlineAddAPhoto } from "react-icons/md";
import AppointmentCard, { AppointmentDTOClient } from '../ui/AppointmentCard'
import AppointmentCardProfessional from '../ui/AppointmentCardProfessional'
import ServicesSection from './ServicesSection'
import SpecialitySection from './SpecialitySection'
import LocationsSection from './LocationsSection'


interface professionalInformation {
  id: string
}

const ProfileProfessional: React.FC<professionalInformation> = ({ id }) => {

  const [professional, setProfessional] = useState<Professional>();
  const [services, setServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([])
  const [allSpeciality, setAllSpecialities] = useState<Speciality[]>([])
  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [starRating, setStarRating] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [appointments, setAppoiments] = useState<AppointmentDTOClient[]>([])
  const [reviews, setReviews] = useState<Review[]>([]);
  const [photo, setPhoto] = useState<File | null>(null)
  const [photo_url, setPhotoUrl] = useState<string | void>(professional?.photo_url || "")
  const [serviceId, setServiceId] = useState('')
  const [specialityId, SetSpecialityId] = useState<string>('')


  const [name, setName] = useState<string | undefined>(professional?.name || '')
  const [last_name, setLastName] = useState<string | undefined>(professional?.last_name || '')
  const [email, setEmail] = useState<string | undefined>(professional?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(professional?.phone_number || '');
  const [description, setDescription] = useState<string | undefined>(professional?.description || '');

  const [isHovered, setIsHovered] = useState<boolean>(false);

  //Select the state of the appointments
  const [selectedState, setSelectedState] = useState<string>('pending');

  const onChangePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {

      setPhoto(event.target.files[0]);
    }
  }

  const onDeleteAppoiment = async (id: string) => {
    await authService.deleteAppoiment(id);
    window.location.reload()
  }

  const ChangeImage = async () => {
    authService.updateProfessional(id, name, last_name, email, phoneNumber, description, photo)
    //window.location.reload();
  }

  const handleFormChange = () => {
    authService.updateProfessional(id, name, last_name, email, phoneNumber, description, null)
    window.location.reload();

  }

  useEffect(() => {
    const fetchData = async () => {
      const responseProfessional = await authService.getProfessional(id);
      setProfessional(responseProfessional);
      setName(responseProfessional.name)
      setLastName(responseProfessional.last_name)
      setEmail(responseProfessional.email)
      setPhoneNumber(responseProfessional.phone_number)
      setPhotoUrl(responseProfessional.photo_url)
      setDescription(responseProfessional.description)

      const responseServices = await authService.getServicesOfProfessional(id);
      setServices(responseServices);

      const responseCities = await authService.getCitiesOfProfessional(id);
      setCities(responseCities);

      const responseReviews = await authService.getReviewsOfProfessional(id);
      setReviews(responseReviews);

      const responseQuestions = await authService.getQuestionsOfProfessional(id);
      setQuestions(responseQuestions);

      const responseSpeciality = await authService.getSpecialitiesOfProfessional(id);
      setSpecialities(responseSpeciality);

      const starPercentage = (responseProfessional.score / 5) * 100;
      setStarRating(`${Math.round(starPercentage / 10) * 10}%`);

      const appoinments = await authService.getAppoimentsToProfessional(id);
      setAppoiments(appoinments)
    }

    fetchData();
  }, [id])



  return (
    <>
      <div className="w-full flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-3/5 lg:mr-2">
          <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-full">
            <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
              <h3 className="ml-3 text-xl">Datos basicos</h3>
            </div>
            <div className="flex flex-col lg:flex-row px-8 py-5">
              <div className="mr-5">
                <div
                  className="relative photo-container mr-5 w-40 h-40"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Image
                    src={professional?.photo_url || ""}
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
              <div className="professional-information">
                <h2 className='font-semibold text-2xl mt-3 mb-1'>{professional?.name} {professional?.last_name} </h2>
                <form>
                  <div className="grid grid-cols-1 gap-4 my-2 sm:grid-cols-2">
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
                        <input value={email} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none" readOnly />
                      </div>
                    </div>
                    <div>
                      <label className="font-light text-sm" htmlFor="phoneNumber">Teléfono</label>
                      <div className="flex">
                        <input onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} id="phoneNumber" type="text" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                      </div>
                    </div>

                  </div >
                  <div className='w-full'>
                    <label className="font-light text-sm" htmlFor="phoneNumber">Descripcion</label>
                    <div className="flex">
                      <textarea onChange={(event) => { setDescription(event.target.value) }} value={description} id="description" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                  </div>
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

          <ServicesSection services={services} professional_id={id} />
          {/* <div className='bg-white mb-3 rounded-lg shadow-md w-full'>
            <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
              <h3 className="ml-3 text-xl">Preguntas</h3>
            </div>
            <div className="px-8 py-5">
              {
                questions.map((question: Question) => (
                  <div key={question.id}>
                    <p className='text-sm font-light mb-2'>{question.client.name} {question.client.last_name}</p>
                    <div className='p-2 border-gray-200 border rounded-md'>
                      <p className='text-sm font-light'>{question.question_description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div> */}
          <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
            <h3 className='font-semibold text-xl mb-2' >{reviews.length} Opiniones sobre ti</h3>

            <div className="mb-5">
              <Rating name="read-only" value={Number(professional?.score) || 0} readOnly precision={0.1} size='medium' />
              <p className='text-sm font-light'>Valoracion global</p>
            </div>

            <h3 className='font-semibold text-lg mb-2'>Opiniones de clientes</h3>
            {
              reviews.map((review: Review) => (
                <>
                  <ReviewCard review={review} />
                </>
              ))
            }

          </div>
        </div>


        <div className="w-full lg:w-2/5">

          <SpecialitySection professional={professional} />
          {professional && <LocationsSection professional={professional} />}

          <div className="bg-white mb-3 rounded-lg shadow-md w-full">
            <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
              <h3 className="ml-3 text-xl">Tus citas agendadas</h3>
            </div>
            <div className="p-8">
              <div className="flex mb-3 space-x-4">
                <div
                  className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'pending' ? 'bg-blue-500 text-white' : 'border'}`}
                  onClick={() => setSelectedState('pending')}
                >
                  Pendientes
                </div>
                <div
                  className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'accepted' ? 'bg-blue-500 text-white' : 'border'}`}
                  onClick={() => setSelectedState('accepted')}
                >
                  Aceptadas
                </div>
                <div
                  className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'rejected' ? 'bg-blue-500 text-white' : 'border'}`}
                  onClick={() => setSelectedState('rejected')}
                >
                  Terminadas
                </div>
                <div
                  className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'completed' ? 'bg-blue-500 text-white' : 'border'}`}
                  onClick={() => setSelectedState('completed')}
                >
                  Completadas
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
                  ) : appointments
                    .filter(appointment => appointment.appointmentStatus?.status.toLowerCase() === selectedState.toLowerCase())
                    .map((appointment, index) => (
                      <AppointmentCardProfessional key={index} appointment={appointment} ></AppointmentCardProfessional>
                    ))

                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    <Image className="opacity-50" src={'/icons/screwdriver_icon.png'} alt="Screwdriver icon" width={200} height={200} />
                    <p className="text-gray-500 mt-4 text-lg font-base">No tiene citas agendadas aún.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ProfileProfessional