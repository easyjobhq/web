"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import React, { useEffect, useState } from 'react'
import ProfessionalCard from './professionalCard';
import { Pagination } from '@mui/material';
import { useGlobalContext } from '@/context/store';

function HomePage() {

  const {  userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext, searchSpeciality, setSearchSpeciality, searchCity, setSearchCity} = useGlobalContext(); 

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [totalProfessionals, setTotalProfessionals] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(3);

  // useEffect(() =>{
  //   const fetchData = async () => {
  //     const response = await authService.getProfessionals(currentPage, pageSize);
  //     setProfessionals(response.data);
  //     setTotalProfessionals(response.total);
  //     console.log(response.data)
  //     console.log("Response . total es: ", response.total);
  //   };

  //   fetchData();
  // }, [currentPage]);

  useEffect(() =>{
    if(searchCity !== '' && searchSpeciality !== '') {
      const fetchData = async () => {
        const response = await authService.searchProfessionalsByQuery( searchCity, searchSpeciality ,currentPage, pageSize)
        setProfessionals(response.data);
        setTotalProfessionals(response.total);
        console.log(response.data)
        console.log("Response . total de QUERY es: ", response.total);
      };

      fetchData();
    } else { 
      const fetchData = async () => {
        const response = await authService.getProfessionals(currentPage, pageSize);
        setProfessionals(response.data);
        setTotalProfessionals(response.total);
        console.log(response.data)
        console.log("Response . total es: ", response.total);
      };
  
      fetchData();
    }

    
    console.log(searchCity, searchSpeciality)
  }, [searchCity, searchSpeciality, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProfessionals / pageSize);

  return (
    <div>
      <div className="mb-3">
        {searchSpeciality}
        <h1 className="text-xl font-semibold w-full mb-2">Resultados de la búsqueda</h1>
        <p className='font-light'>Reserva por internet, nunca pagarás de mas :)</p>
      </div>
      <div className="flex">
        <section className="mr-3 w-4/5">
          {professionals.length > 0 ? (
            professionals.map((professional: Professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))
          ) : (
            <p>No hay profesionales disponibles.</p>
          )}
        </section>
        <section className='flex w-1/5 bg-blue-300 rounded-lg'>
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