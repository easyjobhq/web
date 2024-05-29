import { Review } from '@/interfaces/review'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '../../home/professionalCard.css'

interface Props {
  review: Review
}

function ReviewCard(props: Props) {

  const [starRating, setStarRating] = useState(""); 

  useEffect(()=>{
    const starPercentage = (props.review.score /5) * 100;
    setStarRating(`${Math.round(starPercentage/10) *10}%`);
  }, [])

  return (
    <div className='flex py-3'>
      <div>
        <Image
        className='rounded-full mr-4' 
        src={"/profile-picture.jpg"} 
        alt={'Profile picture'}
        width={30}
        height={30}
        />
      </div>
      <div className="mb-4">
        <p className='font-medium mt-1'>{props.review.client.name} {props.review.client.last_name}</p>
        <div className='stars-outer-review'>
          <div className='stars-inner-review' style={{width: `${starRating}`}}>
          ★ ★ ★ ★ ★
          </div>
        </div>
        <p className='font-light text-sm'>{props.review.comment}</p>
        
      </div>

    </div>
  )
}

export default ReviewCard