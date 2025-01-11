'use client';
import React, { useEffect, useState } from 'react';
import { Professional } from '@/interfaces/professional';
import { authService } from '@/services';
import { BiDollar } from 'react-icons/bi';
import { Review } from '@/interfaces/review';

const ProfessionalCard: React.FC<Professional> = ({
    id,
    name,
    last_name,
    //rating,
    //reviews,
    //address,
    cities,
    //price,
    //isVerified = false,
    photo_url,
    services
    //isOnline = false,
  }) => {

    const [formsRating, setFormsRating] = useState<number>(0.0);

    const displayValue = isNaN(formsRating) ? 0 : formsRating;

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchData = async () => {
    
          const responseRating = await authService.getTotalReview(id);
    
          setFormsRating(responseRating);

          const responseReviews = await authService.getReviewsOfProfessional(id);
          setReviews(responseReviews);
    
        }
    
        fetchData();
    
      }, [])


    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        {/* Header con Avatar */}
        <div className="flex items-start mb-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 mr-3 overflow-hidden">
            <img src={photo_url || '/api/placeholder/56/56'} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                DESTACADO
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-lg font-semibold">{name}</h3>
              {true && (
                <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-600">{last_name}</p>
          </div>
        </div>
  
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < displayValue ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {reviews.length} opinión{reviews.length !== 1 ? 'es' : ''}
          </span>
        </div>
  
        <hr className="my-4" />
  
        {/* Dirección */}
        <h4 className="font-semibold text-sm mb-2">Dirección</h4>
        <div className="flex gap-4 mb-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {cities.map((city, key) => (
                <span className="text-sm" key={key}>{city.city_name}</span>
            ))}    
            
            
          </div>
          {false && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">En línea</span>
            </div>
          )}
        </div>
  
        {
            cities.map((city, key) => (
                <p className="text-sm text-gray-600 mb-4" key={key}>{city.city_name}</p>
            ))
        }
        
  
        {/* Precio */}
        {services.map((service, key ) => (
            <p className="text-sm mb-4" key={key}>
                Asesoría psicológica y psicopedagógica desde $ {Math.round(service.price).toLocaleString('es-ES')}
            </p>
        ))}
        
  
        {/* Calendar Info */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">
            Profesional disponible
          </span>
        </div>
  
        {/* Button */}
        <button className="w-full py-2 px-4 border border-cyan-500 text-cyan-500 rounded hover:bg-cyan-50 transition-colors">
          Avísame si se libera una hora
        </button>
      </div>
    );
  };
  
  export default ProfessionalCard;