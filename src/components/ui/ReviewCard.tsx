import { Review } from '@/interfaces/review'
import { Rating } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ReviewCardProps {
    review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white mb-3 rounded-lg p-3 shadow-md w-full border border-gray-200 space-y-2">
            <Link href={`/professional/${review.professional.id}`} className='flex items-center'>
                <Image className=' rounded-full w-12 mr-5' src={review.professional.photo_url} alt={review.professional.name} width={100} height={100} />
                <p className="text-lg font-normal">{review.professional.name} {review.professional.last_name}</p>
            </Link>
            <div className="h-[1px] bg-gray-200 "></div>
            <div className='flex items-center'>
                <Rating className='mr-3' precision={0.1} name="read-only" value={review.score} readOnly size="small" />
                <p className='font-extralight'>({review.score})</p>
            </div>
            <div>
                <p className='font-light' >{review.comment}</p>
            </div>
        </div>
    )
}

export default ReviewCard