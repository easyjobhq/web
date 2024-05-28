import React from 'react'
import { BsTools } from "react-icons/bs";

function Footer() {
  return (
    <footer className=' bg-white mt-10 '>
        <div className='bg-blue-400 h-1.5'></div>
        <div className="px-80 py-10 justify-center">
            <div className='mb-10 flex justify-around font-light'>
                
                <div className="">
                    <p className='font-semibold text-medium mb-2'>Creado y Desarrollado por:</p> 
                    <div style={{textIndent: "1rem"}}>
                        <li>Juan Jose Diaz</li>
                        <li>Mateo Silva</li>
                        <li>Luis Charria</li>
                    </div>
                </div>
                <div className="">
                    <div className="flex mb-3">
                        <BsTools size="30" className="mr-5"/>
                        <h2 className="text-2xl font-semibold">EasyJob</h2>
                    </div>
                    <p className='mb-1'>Universidad ICESI, Computacion en Internet III</p>
                    <p className='text-sm'>Cl. 18 #122-135, Barrio Pance, Cali, Valle del Cauca</p>    
                </div>
            </div>
            <div className="bg-blue-500 flex justify-center mb-8" style={{height: "0.75px"}}>
                <p className='text-sm mt-5 font-light'>www.easy-job.com © 2024 - Encuentra tu profesional y pide cita</p>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer