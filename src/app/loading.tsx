//create a loading component in nextjs

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          <Skeleton width={200} />
        </span>
        <Skeleton count={5} />
      </p>
      <Skeleton height={500} width={500} className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
    </div>
  );
}