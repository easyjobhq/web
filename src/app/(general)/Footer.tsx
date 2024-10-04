import React from 'react'
import { BsTools } from "react-icons/bs";

function Footer() {
  return (
    <footer className=' bg-white'>
        <div className='bg-blue-400 h-1.5'></div>
        <div className="px-5 md:px-[10%] lg:px-[20%] py-10 justify-center items-center flex-wrap">
            <div className='mb-10 flex justify-around items-center font-light'>
                <div className="">
                    <div className="flex mb-3">
                        <BsTools size="30" className="mr-5"/>
                        <h2 className="text-2xl font-semibold">EasyJob</h2>
                    </div>
                    <p className='text-sm text-center'>Cali, Valle del Cauca, Colombia</p>    
                </div>
                <div className="">
                    <div className='flex flex-wrap list-none' style={{textIndent: "1rem"}}>
                        <li>Juan Jose Diaz</li>
                        <li>Mateo Silva</li>
                        <li>David Dulce</li>    
                    </div>
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