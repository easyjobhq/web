'use client';

import { City } from '@/interfaces/city'
import { Professional } from '@/interfaces/professional'
import { Service } from '@/interfaces/service'
import { Speciality } from '@/interfaces/speciality'
import { PaymentMethod } from '@/interfaces/payment_method';
import { authService, checkService } from '@/services'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import '../../app/(general)/home/professionalCard.css'
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { Review } from '@/interfaces/review'
import ReviewCard from '../../app/(general)/professional/[id]/ReviewCard'
import { Question } from '@/interfaces/question'
import TextField from '@mui/material/TextField';
import { IoSend } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useGlobalContext } from '@/context/store';
import { CreateQuestionDto } from '@/interfaces/create-question.dto'
import { useRouter } from 'next/navigation'
import { CreateReviewDto } from '@/interfaces/create-review.dto'
import { Rating } from '@mui/material'
import Link from 'next/link';
import Modal from '../ui/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Circle, GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';


const mapStyles = {
    width: '100%',
    height: '100%',
};


const libraries: Libraries = ['places']; // Define the libraries array outside of the component


interface professionalInformation {
    id: string
}

const ProPage: React.FC<professionalInformation> = ({ id }) => {

    const circleOptions = useMemo(() => ({
        strokeColor: "#3b82f6",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#3b82f6",
        fillOpacity: 0.35,
    }), []);
    
    const router = useRouter();
    //Context data
    const { userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext } = useGlobalContext();

    // Fetched data
    const [professional, setProfessional] = useState<Professional>();
    const [services, setServices] = useState<Service[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [reviewsCount, setReviewsCount] = useState<number | null>(0);

    // Styles
    const [starRating, setStarRating] = useState("");

    // Actions
    const [isAddQuestion, setIsAddQuestion] = useState(false);
    const [isAddReview, setIsAddReview] = useState(false);

    //Forms

    //Form question
    const [formQuestion, setFormQuestion] = useState('');
    const [formReviewComment, setFormReviewComment] = useState('');

    //Form Rating
    const [formsRating, setFormsRating] = useState<number>(0.0);
    const [hover, setHover] = useState<number>(0);

    // States for scheduling
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedDateJs, setselectedDateJs] = React.useState<Dayjs | null>(dayjs());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isClient, setIsClient] = useState<number | null>(null);

    const availableTimes = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    //States for the modal of the appointments
    const [modalAppointment, setModalAppointment] = useState<boolean>(false);
    const [textModalAppointment, setTextModalAppointment] = useState<string>('');

    //Modal for the error of not signin in
    const [signInError, setSignInError] = useState<boolean>(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
        libraries,
    });


    //Handle submit of forms
    async function handleSubmitQuestion() {

        const question: CreateQuestionDto = {
            title: "CHUPAME EL PICO",
            question_description: formQuestion
        }

        await authService.createQuestion(userIdContext, professional?.id ?? "", question);
        router.push(`/home`);
    }

    async function handleSubmitReview() {

        if (!userIdContext) {
            setSignInError(true);
            return;
        }

        const review: CreateReviewDto = {
            score: reviewsCount || 0,
            comment: formReviewComment
        }

        await authService.createReview(userIdContext, professional?.id ?? "", review);
        router.push(`/home`);
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleLocationChange = (event: SelectChangeEvent<string>) => {
        setSelectedLocation(event.target.value);
    };

    const handleTimeChange = (event: SelectChangeEvent<string>) => {
        setSelectedTime(event.target.value);
    };

    const handleServiceChange = (event: SelectChangeEvent<string>) => {
        setSelectedService(event.target.value);
    };

    const handlePaymentMethodChange = (event: SelectChangeEvent<string>) => {
        setSelectedPaymentMethod(event.target.value as string);
    };

    const onChangeReview = (value: number | null) => {
        setReviewsCount(value);
    }

    const handleAppointmentCreation = async () => {

        if (!userIdContext) {
            setSignInError(true);
            return;
        }

        if (!selectedDateJs || !selectedLocation || !selectedTime || !selectedService) {
            setModalAppointment(true)
            setTextModalAppointment('Por favor, complete todos los campos para agendar la cita.');
            return;
        }
        const appointmentData = {
            date: JSON.stringify(selectedDateJs),
            location: selectedLocation,
            hour: selectedTime,
            service: selectedService,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment/${userIdContext}/${id}/${selectedPaymentMethod}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok) {
                setModalAppointment(true)
                setTextModalAppointment('La cita fue agendada exitosamente');
                setSelectedDate(null);
                setSelectedLocation("");
                setSelectedService("");
                setSelectedTime("");

            } else {
                const errorData = await response.json();
                setModalAppointment(true)
                setTextModalAppointment(`Error al agendar la cita: ${errorData.message}`);
            }
        } catch (error) {
            setModalAppointment(true)
            setTextModalAppointment(`Error al agendar la cita: ${error}`);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const responseProfessional = await authService.getProfessional(id);
            setProfessional(responseProfessional);

            const responseRating = await authService.getTotalReview(id);
            setFormsRating(responseRating);
            //console.log("responseRating", responseRating)

            const responseServices = await authService.getServicesOfProfessional(id);
            setServices(responseServices);

            const responseCities = await authService.getCitiesOfProfessional(id);
            setCities(responseCities);

            const responseQuestions = await authService.getQuestionsOfProfessional(id);
            setQuestions(responseQuestions);

            const responseReviews = await authService.getReviewsOfProfessional(id);
            setReviews(responseReviews);

            const responseSpeciality = await authService.getSpecialitiesOfProfessional(id);
            setSpecialities(responseSpeciality);


            // const responsePaymentMethods = await authService.getPaymentMethods();
            // setPaymentMethods(responsePaymentMethods);

            const starPercentage = (responseProfessional.score / 5) * 100;
            setStarRating(`${Math.round(starPercentage / 10) * 10}%`);

            const response = await checkService.checkIsClient(userIdContext);
            console.log("response", response)
            setIsClient(response);
        }

        fetchData();
    }, [id]);

    return (
        <>
            <div className='flex flex-wrap justify-between'>
                <div className="w-full md:w-[60%]">
                    <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                        <div className="flex">
                            <div className="photo-container mr-5">
                                <Image
                                    src={professional?.photo_url || ""}
                                    alt=""
                                    width={200}
                                    height={200}
                                    className='object-cover w-24 h-24 sm:w-40 sm:h-40 rounded-md'
                                />
                            </div>
                            <div className="professional-information">
                                <h2 className='font-semibold text-lg md:text-2xl mt-3 mb-1'>{professional?.name} {professional?.last_name} </h2>
                                <p className='font-light text-sm'>

                                    {specialities.map((speciality, index) =>
                                        <React.Fragment key={speciality.id}>
                                            {speciality.speciality_name}{index < specialities.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    )}

                                </p>
                                <div className="font-light text-sm mb-2">
                                    <p>
                                        <LocationOnIcon className='text-sm mr-2' />

                                        {
                                            cities.map((city, index) => (
                                                index < cities.length - 1 ? (`${city.city_name}, `) : (`${city.city_name}`)
                                            ))
                                        }
                                    </p>
                                </div>
                                <div className="font-light text-sm mb-2">
                                    <p><LocalPhoneIcon className='text-sm' /> +57 {professional?.phone_number}</p>
                                </div>
                                <div className="items-center mb-2 hidden sm:flex">
                                    <Rating
                                        value={Number.isNaN(formsRating) ? 0 : formsRating}
                                        readOnly
                                        precision={0.1}
                                    />
                                    <div className="ml-2 text-sm font-light">{`(${formsRating})`}</div>
                                </div>
                                {isClient && (
                                    <div className="hidden md:flex">
                                        <Link href={`/professional/${professional?.id}#agendar-cita`} className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-md text-white text-sm flex items-center md:mr-3 border-blue-600 border w-full md:w-auto justify-center mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'>
                                            <FaRegCalendarAlt className='text-white h-5 w-5 mr-2' /> Agendar cita
                                        </Link>
                                        <Link href={`/professional/${professional?.id}#dejar-resena`} className='bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 px-4 py-2 rounded-md text-white text-sm flex items-center md:mr-3 border-gray-600 border w-full md:w-auto justify-center mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'>
                                            <MdOutlineMessage className='text-white h-5 w-5 mr-2' /> Dejar reseña
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="items-center mt-3 mb-2 flex sm:hidden">
                            <Rating
                                value={formsRating}
                                readOnly
                                precision={0.1}
                            />
                            <div className="ml-2 text-sm font-light">{`(${formsRating})`}</div>
                        </div>
                        <div className="flex-col justify-between md:hidden mt-4 space-y-3">
                            <Link href={`/professional/${professional?.id}#agendar-cita`} className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-md text-white text-sm flex items-center md:mr-3 border-blue-600 border w-full md:w-auto justify-center mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'>
                                <FaRegCalendarAlt className='text-white h-5 w-5 mr-2' /> Agendar cita
                            </Link>
                            <Link href={`/professional/${professional?.id}#dejar-resena`} className='bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 px-4 py-2 rounded-md text-white text-sm flex items-center md:mr-3 border-gray-600 border w-full md:w-auto justify-center mb-2 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg' >
                                <MdOutlineMessage className='  text-white h-5 w-5 mr-2' /> Dejar reseña
                            </Link>
                        </div>
                        <p className='text-md mt-5 mb-3 font-light'>{professional?.description}</p>
                    </div>
                    <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                        <h3 className='font-semibold text-xl'>Servicios y precios</h3>
                        {
                            services.length == 0 ? (
                                <div className='flex flex-col items-center justify-center p-10'>
                                    <p className='text-sm text-gray-400'>Este profesional no tiene servicios registrados :(</p>
                                </div>
                            ) : (
                                <div>
                                    <p className='mt-2 text-sm font-light mb-3'>Servicios populares</p>
                                    <div className="services">
                                        {
                                            services.map((service: Service) => (
                                                <React.Fragment key={service.id}>
                                                    <li className='flex items-center text-gray-700 mt-2 mb-2'>
                                                        <div className="flex justify-between w-full">
                                                            <div className='flex items-center font-semibold'>
                                                                <IoIosArrowForward className='text-xs mr-2 font-medium' /> {service.title}
                                                            </div>
                                                            <p className='font-light flex'><BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                                                        </div>
                                                    </li>
                                                    <p className='text-gray-700 text-sm font-light mb-3' style={{ textIndent: "1rem" }}>{service.description}</p>
                                                    <div className="bg-gray-200" style={{ height: "0.5px" }}></div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {professional?.places && professional.places.length > 0 && (
                        <div className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                            <h3 className='font-semibold text-xl mb-5'>Ubicaciones</h3>
                            <div className="w-full h-60">
                                {isLoaded ? (
                                    <GoogleMap
                                        key={JSON.stringify(professional.places)}
                                        clickableIcons={false}
                                        mapContainerClassName='rounded-lg'
                                        mapContainerStyle={mapStyles}
                                        zoom={11}
                                        center={
                                            { lat: 3.421, lng: -76.521 }
                                        }
                                        options={{
                                            disableDefaultUI: true,
                                            streetViewControl: false,
                                            styles: [
                                                {
                                                    featureType: 'poi',
                                                    stylers: [{ visibility: 'off' }],
                                                },
                                                {
                                                    featureType: 'transit',
                                                    stylers: [{ visibility: 'off' }],
                                                },
                                            ],
                                        }}
                                    >
                                        {professional.places.map((place, index) => (
                                            <Circle
                                                key={index}
                                                center={{ lat: place.latitude, lng: place.longitude }}
                                                radius={500} // Adjust the radius as needed
                                                options={circleOptions}
                                            />
                                        ))}
                                    </GoogleMap>
                                ) : (
                                    <p>Cargando...</p>
                                )

                                }
                            </div>

                        </div>
                    )}
                    {/* <div className='main-professional-card bg-white mb-3 rounded-lg px-8 pt-5 pb-7 shadow-md w-full'>
                        <div className="flex justify-between">
                            <h3 className='font-semibold text-xl mb-2'> Preguntas del profesional</h3>
                            {isClient && (
                                <>
                                    <button className='text-sm font-normal border px-3 rounded-md border-gray-300' onClick={() => setIsAddQuestion(!isAddQuestion)}>
                                        Añadir una pregunta
                                    </button>
                                </>
                            )}

                        </div>

                        {
                            questions.map((question: Question) => (
                                <div className='mb-2' key={question.id}>
                                    <p className='text-sm font-light mb-1'>{question.client.name} {question.client.last_name}</p>
                                    <div className='p-2 border-gray-200 border rounded-md'>
                                        <p className='text-sm font-light'>{question.question_description}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {isAddQuestion && (
                            <>
                                <div className="bg-gray-300 mt-4" style={{ height: "0.5px" }}></div>
                                <div className='mb-3 mt-3'>
                                    <p className='text-sm font-light mb-1'>{usernameContext}</p>
                                    <TextField
                                        className='mb-3'
                                        sx={{
                                            width: "100%", '& .MuiInputBase-root': {
                                                fontSize: "0.875rem" // Tamaño del texto dentro del input
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: "0.875rem" // Tamaño del texto del label
                                            }
                                        }}
                                        placeholder="Escribe tu pregunta"
                                        multiline
                                        value={formQuestion}
                                        onChange={(e) => { setFormQuestion(e.target.value) }}
                                    />
                                    <button className=' w-full bg-blue-500 px-3 py-2 rounded-md text-white text-sm flex items-center justify-center mr-3 border-blue-600 border font-medium' onClick={handleSubmitQuestion} > <IoSend className='mr-2' /> Enviar pregunta</button>
                                </div>
                            </>
                        )}
                    </div> */}
                    <div id='dejar-resena' className="main-professional-card bg-white mb-3 rounded-lg px-8 py-5 shadow-md w-full">
                        <div className="flex justify-between">
                            <h3 className='font-semibold text-xl mb-2'>{reviews.length} Opiniones de este profesional</h3>
                            {isClient && (
                                <>
                                    <button className='text-sm font-normal border px-3 rounded-md border-gray-300' onClick={() => setIsAddReview(!isAddReview)}>
                                        Añadir una opinion
                                    </button>
                                </>
                            )}

                        </div>

                        <div className="items-center mb-5">
                            <Rating
                                value={formsRating}
                                readOnly
                                precision={0.1}

                            />
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
                                <div className="bg-gray-300 mt-4" style={{ height: "0.5px" }}></div>
                                <div className='mb-3 mt-3'>
                                    <p className='text-sm font-light mb-1'>{usernameContext}</p>
                                    <Rating
                                        value={reviewsCount}
                                        precision={0.125}
                                        onChange={(event, newValue) => {
                                            onChangeReview(newValue);
                                        }}
                                    />
                                    <TextField
                                        className='mb-3'
                                        sx={{ width: "100%", '& .MuiInputBase-root': { fontSize: "0.875rem" }, '& .MuiInputLabel-root': { fontSize: "0.875rem" } }}
                                        id="outlined-textarea"
                                        placeholder="Escribe tu opinion"
                                        multiline
                                        value={formReviewComment}
                                        onChange={(e) => { setFormReviewComment(e.target.value) }}
                                    />
                                    <button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-2 rounded-md text-white text-sm flex items-center justify-center mr-3 border-blue-600 border font-medium transition duration-300 ease-in-out transform hover:scale-105' onClick={handleSubmitReview}> <IoSend className='mr-2' /> Enviar opinión</button>
                                </div>
                            </>
                        )}
                    </div>
                </div >

                <div className="w-full md:w-[38%] bg-white mb-3 rounded-lg shadow-md flex-grow-0 self-start">

                    {isClient && (
                        <>
                            <div id='agendar-cita' className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                                <h3>Agendar Servicio</h3>
                            </div>

                            <div className="flex flex-col px-8 py-5">
                                <FormControl className="mb-4 text-gray-950 w-full">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                label="Elije la fecha del servicio"
                                                value={selectedDateJs}
                                                onChange={(newValue) => setselectedDateJs(newValue)}
                                                disablePast
                                                sx={{ width: '100%' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                    {/* <DatePicker

                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        className="p-2 border border-gray-400 rounded w-full "
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText="Seleccionar Fecha"
                                    /> */}
                                </FormControl>
                                <FormControl className="mb-4">

                                    <Select
                                        sx={{ fontSize: '16px' }}
                                        displayEmpty
                                        value={selectedLocation || ''}
                                        onChange={handleLocationChange}>
                                        <MenuItem value="" disabled>
                                            Seleccionar Ubicación
                                        </MenuItem>
                                        {cities.map((city) => (
                                            <MenuItem key={city.id} value={city.city_name}>{city.city_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className="mb-4">
                                    <Select
                                        sx={{ fontSize: '16px' }}
                                        value={selectedTime || ''}
                                        onChange={handleTimeChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Seleccionar Hora
                                        </MenuItem>
                                        {availableTimes.map((time) => (
                                            <MenuItem key={time} value={time}>{time}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className="mb-4">
                                    <Select
                                        sx={{ fontSize: '16px' }}
                                        value={selectedService || ''}
                                        onChange={handleServiceChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            Seleccionar Servicio
                                        </MenuItem>
                                        {services.map((service) => (
                                            <MenuItem key={service.id} value={service.id}>{service.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <>
                                    <button onClick={handleAppointmentCreation} className="bg-blue-500 text-white p-3 mb-3 rounded hover:bg-blue-600 font-medium">
                                        Agendar Cita
                                    </button>
                                </>


                            </div>
                        </>
                    )}

                </div>
            </div >
            {/* Modal for the sending of appointments */}
            < Modal isOpen={modalAppointment} onClose={() => { setModalAppointment(false) }} >
                <p>{textModalAppointment}</p>
                <button
                    onClick={() => {
                        setModalAppointment(false)
                    }}
                    className="z-10 h-10 w-full mt-8 bg-blue-500 rounded border-blue-600 border text-white font-medium text-lg"
                >
                    Aceptar
                </button>
            </Modal >
            {/* Modal for the error for not signin in */}
            < Modal isOpen={signInError} onClose={() => { setSignInError(false) }} >
                <p>Por favor, inicia sesión para realizar esta accion</p>
                <p>:/</p>
                <button
                    onClick={() => {
                        router.push('/login')
                    }}
                    className="z-10 h-10 w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded border-blue-600 border text-white font-medium text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Iniciar Sesión
                </button>
            </Modal >
        </>
    )
}

export default ProPage;