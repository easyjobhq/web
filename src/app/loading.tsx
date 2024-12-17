//create a loading component in nextjs

import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 w-screen h-screen flex flex-col items-center justify-center">
      {/* Logo Animation */}
      <div className="animate-pulse opacity-75 mb-5">
        <Image
          src="/easyjob-logos/easyjob_logo_main_color.webp"
          alt="EasyJob Logo"
          width={150}
          height={150}
          priority
          className='w-24 h-24'
        />
      </div>
      <h1 className='text-blue-400 font-bold text-3xl animate-pulse'>Easy Job</h1>
      <p className='font-light'>Profesionales a tu gusto</p>

      {/* Loading Spinner */}
      <div className="mt-6">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}