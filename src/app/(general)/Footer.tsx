import { BsTools } from "react-icons/bs";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=' bg-white'>
      <div className='bg-blue-400 h-1.5'></div>
      <div className="px-5 md:px-[10%] lg:px-[15%] py-10 justify-center items-center flex-wrap">
        <div className='mb-10 flex justify-center sm:justify-between sm:items-start font-light flex-wrap  space-y-10 sm:space-y-0'>
          <div className="w-[80%] sm:w-[25%] ">
            <div className="flex mb-4">
              <BsTools size="30" className="mr-5" />
              <h2 className="text-2xl font-semibold">EasyJob</h2>
            </div>
            <p className="text-sm font-light">Conectando recomendaciones de confianza en el mundo digital</p>
          </div>

          <div className="flex-col w-[80%] sm:w-auto ">
            <h3 className="font-semibold text-lg mb-2">Contacto:</h3>
            <p className='text-sm font-light text-center flex items-center mb-1'><FaLocationDot className="mr-3" /> Cali, Valle del Cauca, Colombia</p>
            <p className='text-sm font-light text-center flex items-center mb-1'><IoMdMail className="mr-3" /> contacto@easyjob.com.co</p>
            <p className='text-sm font-light text-center flex items-center mb-1'><FaPhoneAlt className="mr-3" />+57 318 1234567</p>
          </div>
          <div className="w-[80%] sm:w-[25%] ">
            <div className='justify-start items-start align-baseline'>
              <h5 className="font-semibold text-lg mb-2" >Nuestro Equipo:</h5>
              <ul className=" flex-col flex">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/juan-jose-diaz-parra/"
                    target="_blank"
                    rel="noopener nofollow"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Juan Jose Diaz
                  </Link>
                </li>
                <Link
                  href="https://www.linkedin.com/in/mateo-silva-6b76b41a5/"
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Mateo Silva
                </Link>
                <Link
                  href="https://www.linkedin.com/in/david-dulce/"
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  David Dulce
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 flex justify-center mb-8" style={{ height: "0.75px" }}>
          <p className='text-sm mt-5 font-light text-center'>www.easyjob.com.co © {new Date().getFullYear()} - Encuentra tu profesional y pide cita</p>
        </div>
      </div>
    </footer>
  );
}
