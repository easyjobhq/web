import Footer from "../(general)/Footer";
import Navbar from "../(general)/navbar";
import NavbarRegister from "./Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
  description: "Pagina de registro",
}

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <NavbarRegister/>
            <div className="py-20 px-[3%] sm:px-[10%] lg:px-[35%] bg-slate-100 ">
              {children}
            </div>
        <Footer/>
    </div>
  );
}
