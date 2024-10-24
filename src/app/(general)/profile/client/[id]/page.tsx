'use client'

import React from 'react'
import ProfileCliPage from '@/components/profiles/clientProfile'

interface Props {
    params: { id: string }
}
  

function ProfileCPage({params}: Props) {
    

    return (
        <div className='flex'>
            <ProfileCliPage id={params.id} />
        </div>
    )

}

export default ProfileCPage