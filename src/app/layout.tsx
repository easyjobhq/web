import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/context/store";
import { Suspense } from 'react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Job",
  description: "Encuentra un profesional a pocos clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          
          <GlobalContextProvider>
              {children}
          </GlobalContextProvider>
        </body>
    </html>
  );
}
