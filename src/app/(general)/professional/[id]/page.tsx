"use client"

import { City } from '@/interfaces/city'
import { Professional } from '@/interfaces/professional'
import { Service } from '@/interfaces/service'
import { Speciality } from '@/interfaces/speciality'
import { Client } from '@/interfaces/Client';
import { PaymentMethod } from '@/interfaces/payment_method';
import { authService } from '@/services'
import { Metadata } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import '../../home/professionalCard.css'
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { Review } from '@/interfaces/review'
import ReviewCard from './ReviewCard'
import { Question } from '@/interfaces/question'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IoSend } from "react-icons/io5";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useSession } from 'next-auth/react';

interface Props {
  params: { id: string }
}

function ProfessionalPage({ params }: Props) {
  // Fetched data
  const [professional, setProfessional] = useState<Professional>();
  const [services, setServices] = useState<Service[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Styles
  const [starRating, setStarRating] = useState("");

  // Actions
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [isAddReview, setIsAddReview] = useState(false);

  // States for scheduling
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const router = useRouter();

  const handleAppointmentCreation = async () => {
    // Verificar que se hayan seleccionado todos los campos necesarios
    if (!selectedDate || !selectedLocation || !selectedTime || !selectedService || !selectedPaymentMethod) {
      // Mostrar un mensaje de error o alerta al usuario indicando que debe seleccionar todos los campos necesarios
      return;
    }
  
    try {
      // Obtener la sesión del usuario autenticado
      const { data: session } = useSession();
  
      // Verificar si hay una sesión activa y si el usuario está autenticado
      if (session && session.user) {
        // Obtener el ID del cliente desde la sesión del usuario autenticado
        const clientId = session.user.name;
  
        // Obtener el ID del profesional de la ruta actual
        const { professionalId } = router.query;
  
        // Construir el objeto de datos para enviar al backend
        const appointmentData = {
          date: selectedDate,
          location: selectedLocation,
          hour: selectedTime,
          client: { id: clientId } as Client, // Pasar el ID del cliente obtenido de la sesión del usuario autenticado
          professional: { id: professionalId } as Professional, // Pasar el ID del profesional obtenido de la ruta
          payment_method: { id: selectedPaymentMethod } as PaymentMethod, // Suponiendo que `selectedPaymentMethod` es el ID del método de pago seleccionado
        };
  
        // Realizar una solicitud POST al endpoint del backend para crear la cita
        const response = await fetch(`localhost:3001/appointment/${clientId}/${professionalId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        });
  
        if (response.ok) {
          // La cita se creó correctamente, puedes redirigir al usuario a una página de confirmación u otra página relevante
          router.push('/home');
        } else {
          // Hubo un error al crear la cita, puedes mostrar un mensaje de error al usuario
        }
      } else {
        // El usuario no está autenticado o no hay una sesión activa, manejar según sea necesario
      }
    } catch (error) {
      console.error('Error al crear la cita:', error);
      // Mostrar un mensaje de error al usuario indicando que hubo un problema al crear la cita
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const responseProfessional = await authService.getProfessional(params.id);
      setProfessional(responseProfessional);
      console.log(responseProfessional);

      const responseServices = await authService.getServicesOfProfessional(params.id);
      setServices(responseServices);

      const responseCities = await authService.getCitiesOfProfessional(params.id);
      setCities(responseCities);

      const responseReviews = await authService.getReviewsOfProfessional(params.id);
      setReviews(responseReviews);

      const responseQuestions = await authService.getQuestionsOfProfessional(params.id);
      console.log(responseQuestions)
      setQuestions(responseQuestions);

      const responseSpeciality = await authService.getSpecialitiesOfProfessional(params.id);
      setSpecialities(responseSpeciality);

      const starPercentage = (responseProfessional.score / 5) * 100;
      setStarRating(`${Math.round(starPercentage / 10) * 10}%`);
    }

    fetchData();
  }, [params.id]);

  return (
    <div className='flex'>
      <div className="w-3/5 mr-2">
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <div className="flex">
            <div className="photo-container mr-5">
              <Image
                src={professional?.photo_url || ""}
                alt=""
                width={200}
                height={200}
                className='object-cover w-40 h-40 rounded-md'
              />
            </div>
            <div className="professional-information">
              <h2 className='font-semibold text-2xl mt-3 mb-1'>{professional?.name} {professional?.last_name} </h2>

              {specialities.map((speciality) =>
                <p className='font-light text-sm' key={speciality.id}>{speciality.speciality_name}</p>
              )}

              <div className="flex items-center mb-2">
                <div className='stars-outer'>
                  <div className='stars-inner' style={{ width: `${starRating}` }}>
                    ★ ★ ★ ★ ★
                  </div>
                </div>

                <div className="ml-2 text-sm font-light">{`(${professional?.score})`}</div>
              </div>
              <div className="font-light text-sm mb-6">
                {
                  cities.map((city, index) => (
                    index < cities.length - 1 ? (`${city.city_name}, `) : (`${city.city_name}`)
                  ))
                }
              </div>
              <div className="flex">
                <button className='bg-blue-500 px-3 py-2 rounded-md text-white text-sm flex items-center mr-3 border-blue-600 border'>
                  <FaRegCalendarAlt className='text-white h-5 w-5 mr-2' /> Agendar cita
                </button>
                <button className=' border  border-gray-400 px-3 py-1 rounded-md flex items-center p-3 text-gray-500 text-sm'>
                  <MdOutlineMessage className='  text-gray-500 h-5 w-5 mr-2' /> Dejar reseña
                </button>
              </div>
            </div>
          </div>
          <p className='text-md mt-5 mb-3 font-light'>{professional?.description}</p>
        </div>
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
        <h3 className='font-semibold text-xl'>Servicios y precios</h3>
          <p className='mt-2 text-sm font-light mb-3'>Servicios populares</p>
          <div className="services">
            {
              services.map((service: Service) => (
                <React.Fragment key={service.id}>
                  <li className='flex items-center text-gray-700 mt-2 mb-2'>
                    <div className="flex justify-between w-full">
                      <div className='flex items-center'>
                        <IoIosArrowForward className='text-xs mr-2 font-medium' /> {service.title}
                      </div>
                      <p className='font-light flex'><BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p> 
                    </div>
                  </li>
                  <p className='text-gray-700 text-sm font-light mb-3' style={{ textIndent: "1rem" }}>{service.description}</p>
                  <div className="bg-gray-200" style={{height: "0.5px"}}></div>
                </React.Fragment>
              ))
            }
          </div>
        </div>
        <div className='main-professional-card bg-white mb-3 rounded-lg px-8 pt-5 pb-7 shadow-md w-full'>
          <div className="flex justify-between">
            <h3 className='font-semibold text-xl mb-2'> Preguntas del profesional</h3>
            <button className='text-sm font-normal border px-3 rounded-md border-gray-300' onClick={() => setIsAddQuestion(!isAddQuestion)}>
              Añadir una pregunta
            </button>
          </div>

          {
            questions.map((question: Question) => (
              <div key={question.id}>
                <p className='text-sm font-light mb-1'>{question.client.name} {question.client.last_name}</p>
                <div className='p-2 border-gray-200 border rounded-md'>
                  <p className='text-sm font-light'>{question.question_description}</p>
                </div>
              </div>
            ))
          }
          {isAddQuestion && (
            <>
              <div className="bg-gray-300 mt-4" style={{height: "0.5px"}}></div>
              <div className='mb-3 mt-3'>
                <p className='text-sm font-light mb-1'>Pepito Perez</p>
                <TextField
                  className='mb-3'
                  sx={{width:"100%", '& .MuiInputBase-root': { fontSize: "0.875rem" }, '& .MuiInputLabel-root': { fontSize: "0.875rem" } }}
                  id="outlined-textarea"
                  label=""
                  placeholder="Escribe tu pregunta"
                  multiline
                />
                <button className='w-full bg-blue-500 px-3 py-2 rounded-md text-white text-sm flex items-center justify-center mr-3 border-blue-600 border font-medium'>
                  <IoSend className='mr-2'/> Enviar pregunta
                </button>
              </div>
            </>
          )}
        </div>
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <div className="flex justify-between">
            <h3 className='font-semibold text-xl mb-2'>{reviews.length} Opiniones de este profesional</h3>
            <button className='text-sm font-normal border px-3 rounded-md border-gray-300' onClick={() => setIsAddReview(!isAddReview)}>
              Añadir una opinion
            </button>
          </div>

          <div className="items-center mb-5">
            <div className='stars-outer-opinions text-lg'>
              <div className='stars-inner-opinions text-lg' style={{width: `${starRating}`}}>
                ★ ★ ★ ★ ★
              </div>
            </div>
            <p className='text-sm font-light'>Valoracion global</p>
          </div>

          <h3 className='font-semibold text-lg mb-2'>Opiniones de clientes</h3>
          {
            reviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          }

          {isAddReview && (
            <>
              <div className="bg-gray-300 mt-4" style={{height: "0.5px"}}></div>
              <div className='mb-3 mt-3'>
                <p className='text-sm font-light mb-1'>Pepito Perez</p>
                <TextField
                  className='mb-3'
                  sx={{width:"100%", '& .MuiInputBase-root': { fontSize: "0.875rem" }, '& .MuiInputLabel-root': { fontSize: "0.875rem" } }}
                  id="outlined-textarea"
                  label=""
                  placeholder="Escribe tu reseña"
                  multiline
                />
                <button className='w-full bg-blue-500 px-3 py-2 rounded-md text-white text-sm flex items-center justify-center mr-3 border-blue-600 border font-medium'>
                  <IoSend className='mr-2'/> Enviar reseña
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-2/5 ml-2 flex-wrap">
        <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
          <h3>Agendar Servicio</h3>
        </div>
        <div className="flex flex-col px-8 py-5">
          <label className="mb-2 font-medium text-gray-700">Seleccionar Fecha:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="mb-4 p-2 border rounded"
            dateFormat="MMMM d, yyyy"
            placeholderText="Seleccionar Fecha"
          />
          <label className="mb-2 font-medium text-gray-700">Seleccionar Ubicación:</label>
          <select value={selectedLocation || ''} onChange={handleLocationChange} className="mb-4 p-2 border rounded">
          <option value="" disabled>Seleccionar Ubicación</option>
          {cities.map((city) => (
          <option key={city.id} value={city.id}>{city.city_name}</option>
          ))}
          </select>
          <label className="mb-2 font-medium text-gray-700">Seleccionar Hora:</label>
          <select
            value={selectedTime || ''}
            onChange={handleTimeChange}
            className="mb-4 p-2 border rounded"
          >
            <option value="" disabled>Seleccionar Hora</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <label className="mb-2 font-medium text-gray-700">Seleccionar Servicio:</label>
          <select
            value={selectedService || ''}
            onChange={handleServiceChange}
            className="mb-4 p-2 border rounded"
          >
            <option value="" disabled>Seleccionar Servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.title}</option>
            ))}
          </select>
          <label className="mb-2 font-medium text-gray-700">Método de Pago:</label>
          <select
            value={selectedPaymentMethod || ''}
            onChange={handlePaymentMethodChange}
            className="mb-4 p-2 border rounded"
          >
            <option value="" disabled>Seleccionar Método de Pago</option>
            <option value="credit">Tarjeta de Crédito</option>
            <option value="debit">Tarjeta de Débito</option>
            <option value="cash">Efectivo</option>
          </select>
          <button onClick={handleAppointmentCreation} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalPage

