"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services';
import React, { useEffect, useState } from 'react';
import ProfessionalCard from '../../app/(general)/home/professionalCard';
import { Pagination } from '@mui/material';
import { useGlobalContext } from '@/context/store';
import { useSearchParams } from 'next/navigation';
import GoogleMapsWidget from '../../app/(general)/home/GoogleMapsWidget';
import ProfessionalCardSkeleton from '../../app/(general)/home/professionalCardSkeleton';
import Image from 'next/image';

interface HomePageClientProps {
  initialProfessionals: Professional[];
  initialTotal: number;
}

function HomePageClient({ initialProfessionals, initialTotal }: HomePageClientProps) {
  const { searchSpeciality, setSearchSpeciality, searchCity, setSearchCity } = useGlobalContext();

  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [totalProfessionals, setTotalProfessionals] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const specialityParam = searchParams.get('speciality');
    const cityParam = searchParams.get('city');

    if (cityParam && specialityParam) {
      fetchProfessionalsWithFilter(cityParam, specialityParam);
    } else {
      fetchProfessionalsWithNoFilter();
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
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProfessionals / pageSize);

  return (
    <div>
      <div className="mb-3">
        <h1 className='flex font-medium text-2xl'>
          {searchParams.get('speciality') ? (
            searchParams.get('speciality')
          ) : (
            <>Especialistas</>
          )}
          {searchParams.get('city') ? (
            <> en {searchParams.get('city')}</>
          ) : (
            <> en Colombia</>
          )}
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
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Image className="opacity-50" src={'/icons/loading_icon.png'} alt="Screwdriver icon" width={300} height={300} />
                  {!searchParams.get('speciality') ? (
                    <p className='text-gray-500 mt-4 text-lg font-base'>EasyJob siempre para ti &#128522; </p>
                  ) : (
                    <>
                      <p className="text-gray-500 mt-4 text-lg font-base">No tenemos {searchParams.get('speciality')} en {searchParams.get('city')}.</p>
                      <p className='text-gray-500 mt-4 text-sm font-base'>pronto estaremos alli para ti &#128522; </p>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </section>
        <section className='sticky top-2 flex w-full sm:w-[20%] rounded-lg h-[80vh]'>
          <GoogleMapsWidget
            places={[...professionals.flatMap((professional) => professional.places)]}
            professionals={professionals}
          />
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
  );
}

export default HomePageClient;