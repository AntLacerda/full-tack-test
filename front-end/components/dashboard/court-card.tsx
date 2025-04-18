import { Court } from "@/types/courts"
import Image from "next/image"
import { handleAvailability } from "@/lib/dashboard";
import Link from "next/link";

interface CourtCardProps {
    id: string;
    name: string;
    location: string;
    available: boolean;
    role: string;
}

const handleAvailableChange = async (id: string) => {
    await handleAvailability(id);
    window.location.reload();
}

export default function CourtCard({ id, name, location, available, role }: CourtCardProps) {
    return (
        <div className={`bg-[url('/images/card.png')] bg-size-[140%] w-72 h-76 bg-no-repeat flex flex-col items-center justify-between rounded-2xl py-9 ${available ? "opacity-100" : "opacity-70"} px-4`}>
            <div className="flex flex-col items-center">
                <h1 className={`w-full font-bold ${available ? "bg-[#629764] text-white" : "bg-[#EC7575] line-through"}  px-10 py-1 rounded-md ` }>{name}</h1>
                <p className="text-white font-medium italic">{location}</p>
                {available ? <p className="text-[#fff] font-extrabold">Disponível</p> : <p className="text-[#ec0b0b] font-extrabold">Indisponível</p>}
            </div>

            {
                role === "admin" &&
                <div className={`flex flex-col ${role === "admin" ? "" : "hidden"} `}>
                    <button className={`w-full bg-[#bebebe] text-white font-bold py-2 px-4 rounded-md mt-4 cursor-pointer `} onClick={() => handleAvailableChange(id)}>Alterar Disponibilidade</button>
                    <Link href={`/court/edit/${id}`}>
                        <button className={`w-full bg-[#bebebe] text-white font-bold py-2 px-4 rounded-md mt-4 cursor-pointer `}>Editar</button>
                    </Link>
                </div>
            }

            {
                available && <button className={`w-2/3 bg-[#629764] text-white font-bold py-2 px-4 rounded-md mt-4 cursor-pointer ${!available ? "hidden" : ""}`} onClick={() => alert("Funcionalidade em desenvolvimento")}>Reservar</button>
            }

        </div>
    )
}