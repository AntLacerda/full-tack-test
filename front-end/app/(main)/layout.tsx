"use client";

import Image from "next/image";
import logo from "../../public/images/logo.png";
import { logout } from "@/lib/logout";

const logoutButton = async () => {
    try {
        await logout();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!");
    }
}

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="pt-br">
        <body className="w-full h-screen">
            <header className="flex flex-row justify-between items-center p-3 bg-[#629764]  px-14">
                <Image src={logo} alt="logo" className="w-18"/>
                <button className="text-white cursor-pointer font-bold" onClick={logoutButton}>logout</button>
            </header>
            {children}
        </body>
      </html>
    );
  }