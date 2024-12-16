"use client"

import { RegisterClientProvider } from '@/context/RegisterClient'
import React from 'react'

function RegisterClientLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    return (
        <div>
            <RegisterClientProvider>
                {children}
            </RegisterClientProvider>
        </div>
    )
}

export default RegisterClientLayout