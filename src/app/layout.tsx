import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/context/store";
import { Suspense } from 'react';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default: "Easy Job",
    template: "%s | Easy Job"
  },
  description: "Encuentra un profesional a pocos clicks, Easy Job te ayuda a encontrar el profesional que necesitas para tu hogar",
  openGraph:{
    title: "Easy Job",
    description: "Encuentra un profesional a pocos clicks, Easy Job te ayuda a encontrar el profesional que necesitas para tu hogar",
    type: "website",
    locale: "es_CO",
    url: "https://easyjob.com.co",
    siteName: "Easy Job",
  }
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
