'use client'

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services';
import React, { useEffect, useState } from 'react';
import ProfessionalCard from './professionalCard';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from "next/link";

function HomePage(){
    const [professionals, setProfessionals] = useState<Professional[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await authService.getProfessinals(10, 0);
          setProfessionals(response);
        };
    
        fetchData();
    }, []);

    
    return (
        <div>
          <div className="mb-3">
            <h1 className="text-xl font-semibold w-full mb-2">Resultados de la búsqueda</h1>
            <p className='font-light'>Reserva por internet, nunca pagarás de más :)</p>
          </div>
          <div className="flex">
            <section className="mr-3 w-4/5">
              {professionals.map((professional: Professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </section>
            <section className='flex w-1/5 bg-green-200 rounded-lg'>
              {/* TODO -- Maps API */}
            </section>
          </div>
        </div>
    )




}

export default HomePage;