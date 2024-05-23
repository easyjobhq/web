"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import React, { useEffect, useState } from 'react'



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
        <h1 className="text-xl font-bold">Profesionales en Cali</h1>
        
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
  )
}

export default HomePage