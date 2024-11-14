
import React from 'react'
import ProfessionalProfile from '@/components/profiles/profileProfessional'
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
    description: `Profile of ${name.name} ${name.last_name}`,
    openGraph: {
      title: `${name}`,
      description: `Profile of ${name.name} ${name.last_name}`,
      type: 'profile',
      locale: 'es_CO',
      url: `https://easyjob.com.co/profile/${params.id}`,
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


function ProfilePage({ params }: Props) {

  return (
    <div className='flex'>
      <ProfessionalProfile id={params.id} />
    </div>
  )
}

export default ProfilePage;
