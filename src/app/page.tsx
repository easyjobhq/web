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
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
    </>
  );
};

const words = `¡Conoce lo que hacemos!`;

export default function Home() {

  const [cities, setCities] = useState<City[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(()=>{

    const fetchData = async () =>{
      const responseCities = await authService.getAllCities();
      setCities(responseCities);

      const responseSpecialities = await authService.getAllSpecialities();
      setSpecialities(responseSpecialities);
    }

    fetchData();

  },[])
  
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
      <div className='h-screen w-full items-center'>
        <nav className="h-1/4 flex bg-blue-500 px-80 justify-between">
            <Link href={"/home"} className="flex mt-10">
                  <BsTools color="white" size="30" className="mr-5"/>
                  <h2 className="text-white text-2xl font-bold">Easy Job</h2>
            </Link>
            <div id="left-elements" className="flex items-start justify-between mt-10 space-x-4">
              <Link href={"/login"}>
                <h2 className="text-white text-l">Inicia Sesión</h2>
              </Link>
              <Button variant="contained" color="secondary" href="/register" className='hover:bg-blue-500'>
                ¿Eres un profesional?
              </Button>
            </div>
        </nav>
        <nav className="h-1/2 flex-col bg-blue-500 px-80 items-center space-y-4">
          
          <h1 className='text-white text-3xl font-bold'>Encuentra un profesional en solo unos clicks</h1>
          <h4 className='text-gray-300 text-l'>Mas de * profesionales estan aqui para ayudarte</h4>
         <div id='selects' className='flex space-x-4 bg-blue-700 p-3 rounded-lg'>
          <select className="bg-white rounded-lg p-4 w-1/3" 
          value={selectedSpeciality} 
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSelectedSpeciality(event.target.value);
              
          }}
          
          >
            <option value='No_selected'>Escoge un filtro</option>
            {
              specialities.map((speciality) => (
                <option key={speciality.id} value={speciality.speciality_name}>{speciality.speciality_name}</option>
              ))
            }
            
            
          </select>
          <select className="bg-white rounded-lg p-3 w-1/4"
          value={selectedCity} 
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSelectedCity(event.target.value);
              
          }}
          >
            <option value="No_selected">Escoje un filtro</option>
            {
              cities.map((city) => (
                <option key={city.id} value={city.city_name}>{city.city_name}</option>
              ))
            }
          </select>
          <Button variant="contained" href="/register" className='flex space-x-2 bg-yellow-300 hover:bg-[#2196f3]'>
                <FaSearch className='text-black'/>
                <p className='text-black'>Buscar</p>
          </Button>
        </div> 
        </nav>
        <div className='h-1/2 items-center flex flex-col'>
            <TextGenerateEffect words={words} />
            <Carousel items={cards} />
            <div className='w-full'> {/* Añadido w-full */}
              <Footer />
            </div>
        </div>
        
          
        
        
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