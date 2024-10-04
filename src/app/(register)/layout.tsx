import Footer from "../(general)/Footer";
import Navbar from "../(general)/navbar";
import NavbarRegister from "./Navbar";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <NavbarRegister/>
            <div className="px-96 pt-10 w-full">
              {children}
            </div>
        <Footer/>
    </div>
  );
}
