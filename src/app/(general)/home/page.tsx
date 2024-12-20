"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import React, { useEffect, useState } from 'react'
import ProfessionalCard from './professionalCard';
import { Pagination } from '@mui/material';
import { useGlobalContext } from '@/context/store';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';
import GoogleMapsWidget from './GoogleMapsWidget';
import ProfessionalCardSkeleton from './professionalCardSkeleton';



function HomePage() {

  const { searchSpeciality, setSearchSpeciality, searchCity, setSearchCity } = useGlobalContext();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [totalProfessionals, setTotalProfessionals] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Modal of the google maps API
  //const [isModalGoogleMaps, setIsGoo]


  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const specialityParam = searchParams.get('speciality');
    const cityParam = searchParams.get('city');

    if (cityParam && specialityParam) {
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
      setIsLoading(false);
    }


  };

  const fetchProfessionalsWithNoFilter = async () => {
    const response = await authService.getProfessionals(currentPage, pageSize);
    setProfessionals(response.data);
    setTotalProfessionals(response.total);
    setIsLoading(false);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProfessionals / pageSize);

  return (
    <div>
      <div className="mb-3">
        <h1 className='flex font-medium text-2xl'>
          {
            searchParams.get('speciality') ? (
              searchParams.get('speciality')
            ) : (
              <>Especialistas</>
            )
          }

          {
            searchParams.get('city') ? (
              <> en {searchParams.get('city')}</>
            ) : (
              <> en Colombia</>
            )
          }
        </h1>
        <p className='font-light'>Reserva por internet, nunca pagarás de mas :)</p>
      </div>
      <div className="flex flex-wrap min-h-screen justify-between">
        <section className="w-full sm:w-[78%]">
          {isLoading ? (
            <>
              <ProfessionalCardSkeleton />
              <ProfessionalCardSkeleton />
              <ProfessionalCardSkeleton />
            </>
          ) : (
            <>
              {professionals.length > 0 ? (
                professionals.map((professional: Professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))
              ) : (
                <p>No hay profesionales disponibles.</p>
              )}
            </>
          )}
        </section>
        <section className='flex w-full sm:w-[20%] rounded-lg h-[80vh]' onClick={
          () => {
            console.log("AAAAAAAAAAA")
          }
        }>
          <GoogleMapsWidget
          places={
             [...professionals.flatMap((professional) => professional.places)]
          } />
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