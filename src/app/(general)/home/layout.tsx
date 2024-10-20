import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Principal",
    description: "Pagina principal de Easy Job",
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