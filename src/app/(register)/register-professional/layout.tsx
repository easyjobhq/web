"use client"

import { RegisterClientProvider } from '@/context/RegisterClient'
import { RegisterProfessionalProvider } from '@/context/RegisterProfessional'
import React from 'react'

function RegisterProfessionalLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    return (
        <div>
            <RegisterProfessionalProvider>
                {children}
            </RegisterProfessionalProvider>
        </div>
    )
}

export default RegisterProfessionalProvider