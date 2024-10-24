import React from 'react'
import ProPage from '@/components/professionals/ProfessionalPage'
import { authService } from '@/services';
import { Metadata } from 'next';

interface Props {
  params: { id: string }
}

async function getProfessional(id:string) {
  const responseProfessional = await authService.getProfessional(id);

  return responseProfessional;
}

export async function generateMetadata({params}: Props): Promise<Metadata | undefined> {
  const name = await getProfessional(params.id);
  return {
    title: `${name.name} ${name.last_name}`,
    description: `Profesional ${name.name} ${name.last_name}`,
    openGraph: {
      title: `${name}`,
      description: `Profesional ${name.name} ${name.last_name}`,
      type: 'profile',
      locale: 'es_CO',
      url: `https://easyjob.com.co/professional/${params.id}`,
      siteName: 'Easy Job',
      images: [
        {
          url: `${name.photo_url}`,
          width: 200,
          height: 200,
        }
      ]
    }
  }
}

const ProfessionalPage = ({ params }: Props) => {

  return (
    <>
      <ProPage id={params.id} />
    </>
  )
}

export default ProfessionalPage