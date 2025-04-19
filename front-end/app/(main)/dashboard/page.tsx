"use client"

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


import { findAllCourts } from "@/lib/dashboard";
import CourtCard from "@/components/dashboard/court-card";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
    const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredCourts, setFilteredCourts] = useState<Courts[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = Cookies.get("token");
            if (!token) return;
    
            const decodedToken: DecodedToken = jwtDecode(token);
            setRole(decodedToken.role);
    
            const courtsData = await findAllCourts();
            setCourts(courtsData);
            setFilteredCourts(courtsData); 
          } catch (error) {
            console.error("Erro ao buscar dados do dashboard:", error);
          }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters(searchTerm);
    }, [showAvailableOnly]);

    const applyFilters = (term: string) => {
        const filtered = courts.filter((court) => {
          const matchesName = court.name.toLowerCase().includes(term.toLowerCase());
          const isAvailable = showAvailableOnly ? court.available : true;
          return matchesName && isAvailable;
        });
    
        setFilteredCourts(filtered);
    };

    const handleSearch = () => {
        applyFilters(searchTerm);
    };
    
    return (
        <div className="w-full">

            <main className="w-full flex flex-col p-6">
                <h1 className="text-5xl font-bold mb-3">Quadras</h1>
                <p>Escolha a quadra que você preferir e divirta-se!</p>

                <div className="flex flex-row justify-between">
                    <div className="flex items-center mt-4">
                        <input
                            type="text"
                            placeholder="Digite o nome da quadra..."
                            className="border border-gray-300 px-4 py-2 rounded-l-md w-96 max-w-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-[#629764] text-white px-4 py-2 rounded-r-md hover:bg-[#4b6f4b] transition duration-300 cursor-pointer"
                        >
                            <MagnifyingGlassIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <Link href={"/court/create"} className={`${role === "admin" ? "" : "hidden"}`}>
                        <button className="bg-[#629764] text-white font-bold py-2 px-4 rounded-md mt-4 cursor-pointer  hover:bg-[#4b6f4b] transition duration-300">Criar Quadra</button>
                    </Link>

                </div>


                <div className="flex items-center gap-2 my-4">
                    <span>Mostrar apenas disponíveis</span>
                    <button
                        onClick={() => setShowAvailableOnly((prev) => !prev)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        showAvailableOnly ? 'bg-green-600' : 'bg-gray-300'
                        } hover: cursor-pointer`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                                showAvailableOnly ? 'translate-x-6' : 'translate-x-0'
                            } hover: cursor-pointer`}
                        ></div>
                    </button>
                </div>

                <div className="flex flex-row flex-wrap mt-4 gap-8">
                    {filteredCourts.map((court) => (
                        <CourtCard key={court.id} id={court.id} name={court.name} location={court.location} available={court.available} role={role} />
                    ))}
                </div>
            </main>
            
        </div>
    )
}