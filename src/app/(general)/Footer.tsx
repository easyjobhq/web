import { BsTools } from "react-icons/bs";
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <BsTools size="30" className="mr-5" />
            <span className="text-xl font-semibold">EasyJob</span>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/juan-jose-diaz-parra/"
              target="_blank"
              rel="noopener nofollow"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Juan Jose Diaz
            </Link>
            <Link
              href="https://www.linkedin.com/in/mateo-silva-6b76b41a5/"
              target="_blank"
              rel="noopener nofollow"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Mateo Silva
            </Link>
            <Link
              href="https://www.linkedin.com/in/david-dulce/"
              target="_blank"
              rel="noopener nofollow"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              David Dulce
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="https://easyjob.com.co" className="hover:underline">
            easyjob.com.co
          </Link>{" "}
          © {new Date().getFullYear()} - Encuentra a tu profesional y pide cita
        </div>
      </div>
    </footer>
  );
}
