"use client"

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services'
import { AuthService } from '@/services/auth.service'
import React, { useEffect, useState } from 'react'
import ProfessionalCard from './professionalCard';
import { Pagination } from '@mui/material';

function HomePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [totalProfessionals, setTotalProfessionals] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(3);

  useEffect(() => {
    const fetchData = async () => {
      const response = await authService.getProfessionals(currentPage, pageSize);
      setProfessionals(response.data);
      setTotalProfessionals(response.total);
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalProfessionals / pageSize);

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl font-semibold w-full mb-2">Resultados de la búsqueda</h1>
        <p className='font-light'>Reserva por internet, nunca pagarás de más :)</p>
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
        <section className='flex w-1/5 bg-green-200 rounded-lg'>
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
  );
}

export default HomePage