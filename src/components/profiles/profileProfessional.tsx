'use client'
import { City } from '@/interfaces/city'
import { Professional } from '@/interfaces/professional'
import { Service } from '@/interfaces/service'
import { Speciality } from '@/interfaces/speciality'
import { authService } from '@/services'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
//import '../../app/(general)/home/professionalCard.css'
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { Question } from '@/interfaces/question'
import { Review } from '@/interfaces/review'
import ReviewCard from '../../app/(general)/professional/[id]/ReviewCard'
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Appointment } from '@/interfaces/appoiment'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { FaSave } from "react-icons/fa";
import { Button, Rating } from '@mui/material'
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AppointmentCard, { AppointmentDTOClient } from '../ui/AppointmentCard'
import AppointmentCardProfessional from '../ui/AppointmentCardProfessional'


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
  const [specialityId, SetSpecialityId] = useState('')


  const [name, setName] = useState<string | undefined>(professional?.name || '')
  const [last_name, setLastName] = useState<string | undefined>(professional?.last_name || '')
  const [email, setEmail] = useState<string | undefined>(professional?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(professional?.phone_number || '');
  const [description, setDescription] = useState<string | undefined>(professional?.description || '');

  const [isHovered, setIsHovered] = useState<boolean>(false);

  //Select the state of the appointments
  const [selectedState, setSelectedState] = useState<string>('Pendiente');

  const onChangePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {

      setPhoto(event.target.files[0]);
    }
  }

  const onDeleteAppoiment = async (id: string) => {
    await authService.deleteAppoiment(id);
    window.location.reload()
  }

  const onDeleteService = async (id_service: string) => {
    await authService.deleteServiceToProfessional(id, id_service)
  }

  const onDeleteSpeaciality = async () => {
    await authService.deleteSpecialityToProfessional(id, specialityId)
    window.location.reload()
  }

  const onAddService = async () => {
    authService.addServiceToProfessional(id, serviceId);
    window.location.reload();
  }

  const onAddSpeciality = async () => {
    authService.addSpecialityToProfessional(id, specialityId);
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


  const serviceIds = new Set(services.map(service => service.id));
  const SpecialitiesIds = new Set(specialities.map(speciality => speciality.id))

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

      const all_services = await authService.getServices();
      setAllServices(all_services)

      const all_speciality = await authService.getAllSpecialities();
      setAllSpecialities(all_speciality)

      const appoinments = await authService.getAppoimentsToProfessional(id);
      console.log("Appointments: ", appoinments)
      setAppoiments(appoinments)
    }

    fetchData();
  }, [id])



  return (
    <>
      <div className="w-3/5 mr-2">
        <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-full">
          <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
            <h3 className="ml-3 text-xl">Datos basicos</h3>
          </div>
          <div className="flex px-8 py-5">
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
        <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-full">
          <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
            <h3 className="ml-3 text-xl">Servicios y Precios</h3>
          </div>
          <div className="px-8 py-5">
            <p className='mt-2 text-sm font-light mb-3'>Servicios populares</p>
            <div className="services">
              {
                services.map((service: Service) => (
                  <>
                    <div className="flex">
                      <div className="w-full">
                        <li className='flex items-center text-gray-700 mt-2 font-light mb-2'>
                          <div className="flex justify-between w-full">
                            <div className='flex items-center'>
                              <IoIosArrowForward className='text-xs mr-2' /> {service.title}
                            </div>
                            <p className=' font-light flex'><BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                          </div>
                        </li>
                        <p className='text-gray-700 text-sm font-light mb-3' style={{ textIndent: "1rem" }}>{service.description}</p>
                      </div>
                      <button className="ml-3 px-2 py-1 text-blue-400 text-2xl ">
                        <MdEdit />
                      </button>
                      <button className="ml-3 px-2 py-1 text-blue-400 text-2xl " onClick={() => onDeleteService(service.id)}>
                        <MdDelete />
                      </button>
                    </div>
                    <div className="bg-gray-200" style={{ height: "0.5px" }}></div>

                  </>
                ))

              }

              <label htmlFor="service" className="block mb-2 text-sm font-md w-40 mt-5">Añadir servicio</label>
              <div className="md:flex mb-4 items-center">
                <select
                  id="services"
                  className="border text-sm rounded-lg w-full p-2.5 bg-gray-100"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  <option value="">Elegir servicio</option>
                  {allServices
                    .filter(all_service => !serviceIds.has(all_service.id)) // Filtra los servicios que no están en services
                    .map(filtered_service => (
                      <option key={filtered_service.id} value={filtered_service.id}>
                        {filtered_service.title}
                      </option>
                    ))}
                </select>

                <button className="px-2 py-1 text-gray-500 ml-2 text-2xl" onClick={onAddService}>
                  <IoMdAddCircle />
                </button>
              </div>


            </div>
          </div>

        </div>
        <div className='main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full'>
          <h3 className='font-semibold text-xl mb-2' > Preguntas sobre ti</h3>
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
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <h3 className='font-semibold text-xl mb-2' >{reviews.length} Opiniones sobre ti</h3>

          <div className="items-center mb-5">
            <Rating name="read-only" value={professional?.score} readOnly precision={0.1} size='medium' />
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


      <div className="w-2/5">

        <div className="bg-white mb-3 rounded-lg shadow-md w-full">
          <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
            <h3 className="ml-3 text-xl">Especialidades</h3>
          </div>
          <div className="mt-4 px-8 py-5">
            <form>
              <div className="">
                <label className="font-normal" htmlFor="speciality">Especialidad</label>
                <div className='flex align-middle justify-center items-center mt-2'>
                  <select
                    id="specialities"
                    className="border text-sm rounded-lg bg-gray-100 block w-full p-2.5"
                    value={specialityId}
                    onChange={(e) => SetSpecialityId(e.target.value)}
                  >
                    <option value="">Elije tu servicio</option>
                    {allSpeciality
                      .filter(all_speciality => !SpecialitiesIds.has(all_speciality.id)) // Filtra los servicios que no están en services
                      .map(filtered_service => (
                        <option key={filtered_service.id} value={filtered_service.id}>
                          {filtered_service.speciality_name}
                        </option>
                      ))}
                  </select>
                  <div>
                    <button className="px-3  tracking-wide text-gray-500 text-2xl" type="submit" onClick={onAddSpeciality}><IoMdAddCircle /></button>
                  </div>

                </div>
                <h2 className="text-lg font-medium  ">Eliminar especialidad</h2>
          <div className="mt-2">
            <form>
              <div className="">
                <label className="" htmlFor="speciality">Especialidad</label>
                <div className='flex align-middle justify-center mt-2'>
                  <select
                    id="specialities"
                    className="border text-sm rounded-lg bg-gray-100 block w-full p-2.5"
                    value={specialityId}
                    onChange={(e) => SetSpecialityId(e.target.value)}
                  >
                    <option value="">Elige tu servicio</option>
                    {specialities.map((speciality) => (
                      <option key={speciality.id} value={speciality.id}>
                        {speciality.speciality_name}
                      </option>
                    ))}
                  </select>
                  <div>
                    <button className="px-3 py-2 text-gray-500 text-2xl" type="button" onClick={onDeleteSpeaciality}><MdDelete /></button>
                  </div>

                </div>

              </div>
            </form>
          </div>

              </div>
            </form>
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
                className={`px-5 py-1 rounded-full cursor-pointer ${selectedState === 'Rechazada' ? 'bg-blue-500 text-white' : 'border'}`}
                onClick={() => setSelectedState('Rechazada')}
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
    </>

  )
}

export default ProfileProfessional