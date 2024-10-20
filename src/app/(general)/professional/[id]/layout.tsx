import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profesional",
    description: "Pagina de profesional",
}


export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
    </div>
  )
}