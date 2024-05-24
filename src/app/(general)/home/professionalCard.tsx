import React from 'react'
import Image from 'next/image';
import kanye from "@/../public/kanye.jpg";

function ProfessionalCard() {
  return (
    <div className=" bg-slate-100 mb-3 rounded-lg p-5">
            <div className="upper-section flex">
              <Image
              src={kanye}
              alt=""  
              width={100}
              height={100}
              className='rounded-full'
              />
              <div className='p-5'>
                <h2 className="font-semibold text-xl">Kanye West</h2>
                <p className='text-sm font-light'>Plomero de profesion</p>
              </div>
            </div>
            <div className="medium-section">
              <h3>AYUDAAAA</h3>
            </div>
            
            <div className="upper-section">
              <h3>asdfasdfa</h3>
            </div>
          </div>
  )
}

export default ProfessionalCard