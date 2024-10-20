import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil",
    description: "Pagina de perfil",
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