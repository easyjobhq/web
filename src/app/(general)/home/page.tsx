'use client';

import { Professional } from '@/interfaces/professional';
import { authService } from '@/services';
import React, { useEffect, useState } from 'react';
import ProfessionalCard from './professionalCard';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Link from "next/link";

function HomePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  
  const fetcher = (url: string) =>
    fetch('http://localhost:3001' + url).then((r) => r.json());

  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('currentPage') || '0',0);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const { data, error } = useSWR(
    '/professionals?pageSize=' + pageSize + '&currentPage=' + currentPage,
    fetcher
);



  useEffect(() => {
    const fetchData = async () => {
      const response = await authService.getProfessinals(10, 0);
      setProfessionals(response);
    };

    fetchData();
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const totalPages = Math.ceil(data?.pagination?.total / pageSize);
  const links = Array.from({ length: totalPages }, (_, i) => i);

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

      <h3>Pages {totalPages}:</h3>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link href={`/paginated-rest?pageSize=${pageSize}&currentPage=${link}`}>
              {link === currentPage ? '===> ' : ''}
              {link + 1}
            </Link>
          </li>
        ))}
      </ul>

      <h3>Page size:</h3>
      <ul>
        <li>
          <Link href='/paginated-rest?pageSize=5'>
            5
          </Link>
        </li>
        <li>
          <Link href='/paginated-rest?pageSize=10'>
            10
          </Link>
        </li>
        <li>
          <Link href='/paginated-rest?pageSize=100'>
            100
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
