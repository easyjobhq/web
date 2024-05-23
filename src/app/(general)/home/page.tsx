"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import kanye from "@/../public/kanye.jpg";



function HomePage() {

  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect( () => {
    const fetchData = async () => {
      const response = await authService.getProfessinals();
      setProfessionals(response);
    }  

    fetchData();
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold w-full mb-5">Resultados de la busqueda</h1>
      <div className="flex">
      <section className=" bg-slate-400 w-4/5 p-3">
          <div className="bg-slate-800 w-full mb-3">
            <div className="upper-section flex">
              <Image
              src={kanye}
              alt=""  
              width={200}
              height={100}
              />
              <div>
                <h2>Kanye West</h2>
                <p>Plomero de profesion</p>
              </div>
            </div>
            <div className="medium-section">
              <h3>PENEEE</h3>
            </div>
            
            <div className="upper-section">
              <h3>asdfasdfa</h3>
            </div>
          </div>
          
        </section>
        <section className='flex w-1/5 bg-slate-700'>
          AYUDA
        </section>
            {
            professionals.map((professional) => 
                <>
                  <li>{professional.id}</li>
                  <li>{professional.name}</li>
                  <li>{professional.last_name}</li>

                  <li>{professional.email}</li>

                  <li>{professional.phone_number}</li>

                  <li>{professional.photo_url}</li>

                  <li>{professional.roles.toString()}</li>

                  <li>{professional.score}</li>

                  <li>{professional.description}</li>
                </>

            )
          }
      </div>
        
    </div>
  )
}

export default HomePage