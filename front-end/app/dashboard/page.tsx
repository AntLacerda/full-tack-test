"use client"

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { findAllCourts } from "@/lib/dashboard";
import CourtCard from "@/components/dashboard/court-card";

interface DecodedToken {
    name: string;
    email: string;
    role: string;
}

interface Courts {
    id: string;
    name: string;
    location: string;
    available: boolean;
}

export default function Dashboard() {
    const [role, setRole] = useState<string>("");
    const [courts, setCourts] = useState<Courts[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = Cookies.get("token");
      
            if (!token) {
              return;
            }
      
            const decodedToken: DecodedToken = jwtDecode(token);
            setRole(decodedToken.role);
      
            const courtsData = await findAllCourts();
            setCourts(courtsData);
          } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
          }
        };
      
        fetchData();
    }, []);
    
    return (
        <div className="w-full h-screen">
            <header className="flex flex-row justify-center items-center p-3 bg-[#629764]">
                <Image src={logo} alt="logo" className="w-18"/>
            </header>
            <main className="w-full flex flex-col p-6">
                <h1 className="text-5xl font-bold mb-3">Quadras</h1>
                <p>Escolha a quadra que você preferir e divirta-se!</p>
                <div className="flex flex-row flex-wrap mt-4 gap-8">
                    {courts.map((court) => (
                        <CourtCard key={court.id} id={court.id} name={court.name} location={court.location} available={court.available} />
                    ))}
                </div>
            </main>
            
        </div>
    )
}