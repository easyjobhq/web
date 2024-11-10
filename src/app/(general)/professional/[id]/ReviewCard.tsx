import { Review } from '@/interfaces/review'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '../../home/professionalCard.css'
import { Rating } from '@mui/material'

interface Props {
  review: Review
}

function ReviewCard(props: Props) {

  const [imageError, setImageError] = useState(false);


  return (
    <div className='flex py-3'>
      <div>
        <Image
        className='rounded-full mr-4 w-10 h-10 object-fill' 
        src={ imageError ? '/profile-picture.jpg': props.review.client.photo_url } 
        alt={props.review.client.name}
        width={30}
        height={30}
        onError={() => setImageError(true)}
        />
      </div>
      <div className="mb-4">
        <p className='font-medium mt-1'>{props.review.client.name} {props.review.client.last_name}</p>
        <Rating name="read-only" value={props.review.score} readOnly precision={0.1} size='small'/>
        <p className='font-light text-sm'>{props.review.comment}</p>
        
      </div>

    </div>
  )
}

export default ReviewCard