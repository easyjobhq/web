'use client'
import Image from "next/image";
import Link from "next/link";
import { BsTools } from "react-icons/bs";
//importa button from materia ui
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { FaSearch } from 'react-icons/fa';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { WavyBackground } from "../components/ui/wavy-background";
import { useEffect, useState } from "react";
import { authService } from '@/services'
import Footer from "./(general)/Footer";
import { City } from "@/interfaces/city";
import { Speciality } from "@/interfaces/speciality";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from "next/navigation";
import { FlipWords } from "../components/ui/flip-words";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';


const DummyContent = () => {
  return (
    <>

      <div
        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
      >
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Estamos siempre a tu disposición.
          </span>{" "}
          Nuestra empresa se basa en conocer al cliente, y en ofrecerle un servicio de calidad y eficaz.
          Para nosotros es muy importante la satisfacción del cliente, por lo que siempre estamos en constante comunicación con el cliente.
          Nuestros profesionales están altamente capacitados para resolver cualquier problema que se les presente.
        </p>
        <Image
          src="https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg"
          alt="Macbook mockup from Aceternity UI"
          height="1000"
          width="1000"
          className="md:w-full md:h-full h-full w-full mx-auto object-contain"
        />
      </div>
    </>
  );
};

const words = [`¡Conoce lo que hacemos!`, '¡Ven y disfruta la experiencia!', '¡Estamos para ayudarte!', '¡No dudes en contactarnos!', '¡Estamos para servirte!'];

export default function Home() {

  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      const responseCities = await authService.getAllCities();
      setCities(responseCities);

      const responseSpecialities = await authService.getAllSpecialities();
      setSpecialities(responseSpecialities);
    }

    fetchData();

  }, []);

  function handleSubmitSearch() {
    router.push(`/home?speciality=${selectedSpeciality}&city=${selectedCity}`)
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: purple[50],
        dark: '#002884',
      },

    },
  });





  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-between min-h-[75vh] bg-blue-500 px-[5%] md:px-[15%] lg:px-[15%]">
        <nav className="flex justify-between items-center align-bottom pt-5">
          <Link href={"/home"} className="flex">
            <Image src="/EasyJob-logo-white.png" alt="EasyJob logo" width={25} height={25} layout="intrinsic" className="w-7 h-7 mr-3 object-fill" />
            <h2 className="text-white text-2xl font-bold hidden sm:block">Easy Job</h2>
          </Link>
          <div className="flex flex-wrap space-x-4 justify-end">
            <Link href={"/login"}>
              <p className="text-white text-xs md:text-sm p-2">Inicia Sesión</p>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              href="/register-professional"
              className='hover:bg-yellow-300'
              style={{ textTransform: 'none' }}
            >
              <p className="text-xs md:text-sm" >¿Eres un profesional?</p>
            </Button>
          </div>
        </nav>
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between flex-grow mt-20 lg:mt-0">
          <nav className="flex-col items-end space-y-4 w-full lg:w-[40%]">
            <h1 className='text-white text-3xl font-bold'>Encuentra un profesional en solo unos clicks</h1>
            <h4 className='text-gray-300 text-l'>Cientos de especialistas estan aqui para ayudarte</h4>
            <div id='selects' className='w-full  flex-wrap space-y-2 bg-[#377AE7] p-3 rounded-lg'>

              <select className="bg-white font-light rounded-md p-4 flex-grow w-full"
                value={selectedSpeciality}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setSelectedSpeciality(event.target.value);
                }}
              >
                <option value='No_selected'>Especialidad</option>
                {specialities.map((speciality) => (
                  <option key={speciality.id} value={speciality.speciality_name}>{speciality.speciality_name}</option>
                ))}
              </select>

              <select className="bg-white font-light rounded-md p-4 flex-grow w-full"
                value={selectedCity}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setSelectedCity(event.target.value);
                }}
              >
                <option value="No_selected">Ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.city_name}>{city.city_name}</option>
                ))}
              </select>

              <Button
                variant="contained"
                className='flex space-x-2 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:bg-yellow-400 min-h-14 w-full mt-3'
                style={{ textTransform: 'none', padding: '0 2rem' }}
                onClick={handleSubmitSearch}
              >
                <FaSearch className='text-black' />
                <p className='text-black font-medium'>Buscar</p>
              </Button>
            </div>
          </nav>
          <Image src="/welcome-page-image.png" alt="EasyJob landing page" width={2000} height={1000} layout="intrinsic" className="w-full lg:w-[55%]" />
        </div>
      </div>
      <div className='items-center flex flex-col'>
        <div className=" dark:text-white text-black text-3xl leading-snug tracking-wide font-bold">
          <FlipWords className="mt-20 mb-20 md:mb-0" words={words} /> <br />
        </div>
        <Carousel items={cards} />
      </div>
      <div className="m-auto max-w-7xl mb-20">
        <h2 className="text-center font-bold text-4xl mb-10">Nuestros Beneficios</h2>
        <div className=" flex justify-center">
          <Image
            src={"/easyjob_phone.png"}
            alt={"EasyJob Movile View"}
            width={800}
            height={800}
            className=" hidden lg:block  w-72 transform rotate-12 mr-24 mb-10 object-contain"
          />
          <div className="mx-5 max-w-3xl lg:w-full  m-auto">
            <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:mg-20 lg:gap-20">
              <li className="flex w-full flex-1 flex-col items-start">
                <div className="rounded-full p-4 lg:p-5 bg-blue-100">
                  <VolunteerActivismIcon />
                </div>

                <h3 className="text-xl font-bold mt-5 capitalize">Perfiles Personalizados</h3>
                <p className="font-light">Cada profesional puede crear un perfil único que incluye su experiencia, habilidades, y servicios ofrecidos. Esto permite a los clientes encontrar al profesional perfecto para sus necesidades específicas.</p>
              </li>
              <li className="flex w-full flex-1 flex-col items-start">
                <div className="rounded-full p-4 lg:p-5 bg-blue-100">
                  <StarIcon />
                </div>

                <h3 className="text-xl font-bold mt-5 capitalize">Opiniones y Calificaciones</h3>
                <p className="font-light">Los clientes pueden dejar reseñas y calificaciones después de contratar un servicio. Esto ayuda a construir confianza y a destacar a los mejores profesionales en la plataforma.</p>
              </li>
              <li className="flex w-full flex-1 flex-col items-start">
                <div className="rounded-full p-4 lg:p-5 bg-blue-100">
                  <ImageIcon />
                </div>

                <h3 className="text-xl font-bold mt-5 capitalize">Búsqueda por Ubicación</h3>
                <p className="font-light">Encuentra profesionales cerca de ti fácilmente con nuestra función de búsqueda geolocalizada. Podrás ver a los expertos disponibles en tu área y contactarlos rápidamente.</p>
              </li>
              <li className="flex w-full flex-1 flex-col items-start">
                <div className="rounded-full p-4 lg:p-5 bg-blue-100">
                  <VolunteerActivismIcon />
                </div>

                <h3 className="text-xl font-bold mt-5 capitalize"> Conexión Directa</h3>
                <p className="font-light">Simplifica el proceso de contratación con nuestra plataforma. Conecta directamente con plomeros, carpinteros, mecánicos y otros profesionales para discutir tus necesidades y obtener el mejor servicio.</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="w-full relative">
        <Image
          src={"/fixer-man.jpg"}
          alt="Fixer man"
          width={3840}
          height={2160}
          className="w-screen h-[70vh] object-cover "
        />
        <div className="w-full absolute inset-0 flex flex-wrap justify-around items-center ">
          <Image
            src={"/appointment_mockup.png"}
            alt="Front image"
            width={1000}
            height={1000}
            className="max-w-80 lg:max-w-md h-auto object-contain"
          />
          <div className="p-10 rounded-lg">
            <h2 className="text-4xl font-bold text-blue-500">¡Haz una cita ahora!</h2>
            <p className="text-lg font-light text-white">Reserva una cita con tu profesional favorito en solo unos clicks.</p>
            <Button
              variant="contained"
              color="secondary"
              href="/home?speciality=&city="
              className='bg-blue-500 hover:bg-blue-300'
              style={{ textTransform: 'none' }}
            >
              <p className="text-xs md:text-sm" >¡Reservar Ahora!</p>
            </Button>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

const data = [
  {
    category: "Fontaneria",
    title: "Profesionales de la mas alta calidad",
    src: "https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Productividad",
    title: "Problemas solucionados en minutos",
    src: "https://images.pexels.com/photos/9607253/pexels-photo-9607253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Calidad",
    title: "Podras contar con la mejor calidad del mercado",
    src: "https://images.pexels.com/photos/2310904/pexels-photo-2310904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },

  {
    category: "Eficiencia",
    title: "Eficiencia en cada uno de nuestros trabajos",
    src: "https://images.pexels.com/photos/4682081/pexels-photo-4682081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Garantia",
    title: "Garantia de satisfaccion en cada uno de nuestros trabajos",
    src: "https://images.pexels.com/photos/2339722/pexels-photo-2339722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
  {
    category: "Apoyo",
    title: "Apoyo en todo momento",
    src: "https://images.pexels.com/photos/8005400/pexels-photo-8005400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: <DummyContent />,
  },
];