"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import React, { useEffect, useState } from 'react'
import ProfessionalCard from './professionalCard';
import { Pagination } from '@mui/material';
import { useGlobalContext } from '@/context/store';
import { useSearchParams } from 'next/navigation';

function HomePage() {

  const { searchSpeciality, setSearchSpeciality, searchCity, setSearchCity} = useGlobalContext(); 

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [totalProfessionals, setTotalProfessionals] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);


  const searchParams = useSearchParams();

  useEffect(() => {
    
    const specialityParam = searchParams.get('speciality');
    const cityParam = searchParams.get('city');

    if(cityParam && specialityParam) {
      fetchProfessionalsWithFilter(cityParam, specialityParam);
    } else {
      fetchProfessionalsWithNoFilter()
    }

  }, [currentPage, searchParams]);
  
  
  const fetchProfessionalsWithFilter = async (cityParam: string, specialityParam: string) => {

    if (cityParam && specialityParam) {
      const response = await authService.searchProfessionalsByQuery(cityParam, specialityParam, currentPage, pageSize);
      setProfessionals(response.data);
      setTotalProfessionals(response.total);
    }


  };

  const fetchProfessionalsWithNoFilter = async () => {
    const response = await authService.getProfessionals(currentPage, pageSize);
    setProfessionals(response.data);
    setTotalProfessionals(response.total);
  }
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProfessionals / pageSize);

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl font-semibold w-full mb-2">Resultados de la búsqueda</h1>
        <p className='font-light'>Reserva por internet, nunca pagarás de mas :)</p>
      </div>
      <div className="flex flex-wrap min-h-screen justify-between">
        <section className="w-full sm:w-[78%]">
          {professionals.length > 0 ? (
            professionals.map((professional: Professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))
          ) : (
            <p>No hay profesionales disponibles.</p>
          )}
        </section>  
        <section className='flex w-full sm:w-[20%] bg-blue-300 rounded-lg min-h-60'>
          {/* TODO -- Maps API */}
        </section>
      </div>
      <div className="pagination flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  )
}

export default HomePage