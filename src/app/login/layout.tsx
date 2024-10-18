import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Pagina de login",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}