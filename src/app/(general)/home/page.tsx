"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'

import React, { useEffect, useState } from 'react'

import ProfessionalCard from './professionalCard';



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
      <h1 className="text-xl font-semibold w-full mb-5">Resultados de la busqueda</h1>
      <div className="flex">
      <section className=" mr-3 w-4/5 ">
          <ProfessionalCard/>
          <ProfessionalCard/>
      </section>
      <section className='flex w-1/5 bg-slate-700 rounded-lg'>
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