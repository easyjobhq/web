"use client"

import { City } from '@/interfaces/city'
import { Professional } from '@/interfaces/professional'
import { Service } from '@/interfaces/service'
import { Speciality } from '@/interfaces/speciality'
import { authService } from '@/services'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import '../../home/professionalCard.css'
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { Question } from '@/interfaces/question'
import { Review } from '@/interfaces/review'
import ReviewCard from '../../professional/[id]/ReviewCard'
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { uploadFile } from '@/firebase/config'

interface Props {
  params: { id: string }
}

function ProfilePage({ params }: Props) {

  const [professional, setProfessional] = useState<Professional>();
  const [services, setServices] = useState<Service[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [starRating, setStarRating] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [photo, setPhoto] = useState<File | null>(null)
  const [photo_url,setPhotoUrl]= useState<string | undefined>(professional?.photo_url || "")

  const [name, setName]= useState<string | undefined>(professional?.name || '')
  const [last_name, setLastName]= useState<string | undefined>(professional?.last_name || '')
  const [email, setEmail] = useState<string | undefined>(professional?.email||'');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(professional?.phone_number||'');
  const [id, setId] = useState<string | undefined>(professional?.id || '')

  const [isHovered, setIsHovered] = useState<boolean>(false);

  

  const onChangePhoto = async(event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
      const url = await uploadFile(event.target.files[0]).then((url)=>setPhotoUrl(url))
      
    }
  }

  const ChangeImage= async()=>{
      authService.updateProfessional(id, name, last_name, email, phoneNumber, photo_url)
      window.location.reload();
  }

  const handleEmailChange = () => {
    
    authService.updateProfessional(id, name, last_name, email, phoneNumber, photo_url)
    window.location.reload();

  }
  const handlePhoneNumberChange = () => {
    authService.updateProfessional(id, name, last_name, email, phoneNumber, photo_url)
    window.location.reload();
  }
  const handleNameChange = ()=>{
    authService.updateProfessional(id, name, last_name, email, phoneNumber, photo_url)
    window.location.reload();
  }
  const handleLastNameChange = () =>{
    authService.updateProfessional(id, name, last_name, email, phoneNumber, photo_url)
    window.location.reload();
  }

  useEffect(() => {
    const fetchData = async () => {
      const responseProfessional = await authService.getProfessional(params.id);
      setProfessional(responseProfessional);
      console.log(responseProfessional);
      setName(responseProfessional.name)
      setLastName(responseProfessional.last_name)
      setEmail(responseProfessional.email)
      setPhoneNumber(responseProfessional.phone_number)
      setPhotoUrl(responseProfessional.photo_url)
      setId(responseProfessional.id)

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
  }, [params.id])

  return (
    <div className='flex'>
      <div className="w-3/5 mr-2">
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <div className="flex">
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
              <button type="submit" className="text-cream-lighter bg-brick hover:bg-brick-dark" onClick={ChangeImage}>
                  Create profi
              </button>
            </div>
            <div className="professional-information">
              <h2 className='font-semibold text-2xl mt-3 mb-1'>{professional?.name} {professional?.last_name} </h2>

              {specialities.map((speciality) =>
                <p className='font-light text-sm'>{speciality.speciality_name}</p>
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
            </div>
          </div>
          <p className='text-md mt-5 mb-3 font-light'>{professional?.description}</p>
        </div>
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <h3 className='font-semibold text-xl' >Servicios y precios</h3>
          <p className='mt-2 text-sm font-light mb-3'>Servicios populares</p>
          <div className="services">
            {
              services.map((service: Service) => (
                <>
                  <li className='flex items-center text-gray-700 mt-2 font-light mb-2'>
                    <div className="flex justify-between w-full">
                      <div className='flex items-center'>
                        <IoIosArrowForward className='text-xs mr-2' /> {service.title}
                      </div>
                      <p className=' font-light flex'><BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                    </div>
                  </li>
                  <p className='text-gray-700 text-sm font-light mb-3' style={{ textIndent: "1rem" }}>{service.description}</p>
                  <div className="bg-gray-200" style={{ height: "0.5px" }}></div>
                </>
              ))
            }
          </div>
        </div>
        <div className='main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full'>
          <h3 className='font-semibold text-xl mb-2' > Preguntas del profesional</h3>
          {
            questions.map((question: Question) => (
              <div>
                <p className='text-sm font-light mb-2'>{question.client.name} {question.client.last_name}</p>
                <div className='p-2 border-gray-200 border rounded-md'>
                  <p className='text-sm font-light'>{question.question_description}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
          <h3 className='font-semibold text-xl mb-2' >{reviews.length} Opiniones de este profesional</h3>

          <div className="items-center mb-5">
            <div className='stars-outer-opinions text-lg'  >
              <div className='stars-inner-opinions text-lg' style={{ width: `${starRating}` }} >
                ★ ★ ★ ★ ★
              </div>
            </div>
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


      <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-2/5 ml-2 flex-wrap">
        <div className="bg-blue-500 text-white  rounded-tr-md rounded-tl-md px-3 py-3 text-lg  font-semibold">
          <h3>Informacion personal</h3>
        </div>
        <div className="flex flex-col px-8 py-5 bg-gray-100 rounded-lg">
          <div className="flex items-center mb-3 space-x-2">
            <FaEnvelope className="text-blue-500" />
            <input
              type="text"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              className="flex-1 px-2 py-1 text-lg text-gray-700 border border-gray-300 rounded-lg"
              placeholder={email}
            />
            <button className="px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600" onClick={handleEmailChange}>
              Cambiar
            </button>
          </div>
          <div className="flex items-center mb-3 space-x-2">
            <FaPhone className="text-green-500" />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e)=>{setPhoneNumber(e.target.value)}}
              className="flex-1 px-2 py-1 text-lg text-gray-700 border border-gray-300 rounded-lg"
              placeholder={phoneNumber}
            />
            <button className="px-2 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600" onClick={handlePhoneNumberChange}>
              Cambiar
            </button>
          </div>
          <div className="flex items-center mb-3 space-x-2">
            <FaUser className="text-green-500" />
            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              className="flex-1 px-2 py-1 text-lg text-gray-700 border border-gray-300 rounded-lg"
              placeholder={name}
            />
            <button className="px-2 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600" onClick={handleNameChange}>
              Cambiar
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="text-green-500" />
            <input
              type="text"
              value={last_name}
              onChange={(e)=>{setLastName(e.target.value)}}
              className="flex-1 px-2 py-1 text-lg text-gray-700 border border-gray-300 rounded-lg"
              placeholder={last_name}
            />
            <button className="px-2 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600" onClick={handleLastNameChange}>
              Cambiar
            </button>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default ProfilePage;
