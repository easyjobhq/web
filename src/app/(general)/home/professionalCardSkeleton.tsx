'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Professional } from '@/interfaces/professional';
import "./professionalCard.css";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { authService } from '@/services';
import { Service } from '@/interfaces/service';
import { BiDollar } from "react-icons/bi";
import { City } from '@/interfaces/city';
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";
import { Speciality } from '@/interfaces/speciality';
import { Rating } from '@mui/material';


function ProfessionalCardSkeleton() {


    return (
        <div className="bg-white mb-3 rounded-lg px-8 py-5 shadow-md flex animate-pulse">
            <div className='w-[95%] flex justify-between flex-wrap'>
                <div className="left-section-card w-full lg:w-6/12 pr-5">
                    <div className="upper-section flex mb-2">
                        <div className='object-cover rounded-full m-1 w-24 h-24 bg-gray-300'></div>
                        <div className='p-5'>
                            <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                            <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
                            <div className='hidden sm:flex justify-left items-center'>
                                <div className='h-4 bg-gray-300 rounded w-24'></div>
                                <div className="ml-2 h-4 bg-gray-300 rounded w-12"></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex sm:hidden justify-left items-center mb-3'>
                        <div className='h-4 bg-gray-300 rounded w-24'></div>
                        <div className="ml-2 h-4 bg-gray-300 rounded w-12"></div>
                    </div>
                    <div className='bg-gray-300 w-full pr-3' style={{ height: "0.25px" }}></div>
                    <div className="medium-section pt-3 pl-3 pb-3 flex items-center">
                        <FaPhoneAlt className='mr-2 h-3 text-gray-300' />
                        <div className='h-4 bg-gray-300 rounded w-32'></div>
                    </div>
                    <div className="medium-section pl-3 flex items-center">
                        <FaMapMarkerAlt className='mr-2 h-3 text-gray-300' />
                        <div className='h-4 bg-gray-300 rounded w-48'></div>
                    </div>
                </div>

                {/* Right section */}
                <div className="flex w-full lg:w-6/12 pt-4 sm:pt-0">
                    <div className='bg-gray-300 h-full hidden lg:block' style={{ width: "0.25px" }}></div>
                    <div className='pl-5 sm:pl-7 pt-2'>
                        <div>
                            <div className='mb-3'>
                                <div className='h-4 bg-gray-300 rounded w-48 mb-2'></div>
                                <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
                                <div className='h-4 bg-gray-300 rounded w-24'></div>
                            </div>
                            <div className='mb-3'>
                                <div className='h-4 bg-gray-300 rounded w-48 mb-2'></div>
                                <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
                                <div className='h-4 bg-gray-300 rounded w-24'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5 flex items-center">
                <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
            </div>
        </div>
    )
}

export default ProfessionalCardSkeleton