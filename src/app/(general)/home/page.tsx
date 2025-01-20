import { Metadata } from 'next';
import HomePageClient from '../../../components/home/homePage';
import { authService } from '@/services';
import { capitalize } from '@mui/material';
import { title } from 'process';
import React from 'react';

interface Props {
  searchParams: {
    speciality?: string;
    city?: string;
  }
}



export async function generateMetadata({ searchParams }: Props): Promise<Metadata | undefined> {
  
  const speciality = searchParams.speciality ? searchParams.speciality : 'Especialistas';
  const city = searchParams.city ? searchParams.city : 'Colombia';

  return{
    title: `${speciality} en ${city}, Colombia | Easy Job`,
    description: `Encuentra los mejores ${speciality} en ${city}, Colombia. ¡Regístrate y contrata a un profesional!`,
    keywords: [`${speciality}`, `${city}`, 'Colombia', 'Easy Job'],
    openGraph: {
      title: `${speciality} en ${city}, Colombia | Easy Job`,
      description: `Encuentra los mejores ${speciality} en ${city}, Colombia. ¡Regístrate y contrata a un profesional!`,
      type: 'website',
      locale: 'es_CO',
      url: `https://easyjob.com.co/home`,
      siteName: 'Easy Job',
      images: [
        {
          url: '/easyjob-logos/easy_logo_main_color.png',
          width: 200,
          height: 200,
        }
      ]
    }
  }

}

async function HomePage() {
  // Get initial data server-side
  const initialData = await authService.getProfessionals(1, 10);


  return (
    <HomePageClient 
      initialProfessionals={initialData.data} 
      initialTotal={initialData.total} 
    />
  );
}

export default HomePage;