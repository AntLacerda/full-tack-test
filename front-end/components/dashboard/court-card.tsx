import { Court } from "@/types/courts"
import Image from "next/image"

export default function CourtCard({id, name, location, available}: Court) {
    return (
        <div className={`bg-[url('/images/card.png')] bg-size-[140%] w-72 h-76 bg-no-repeat flex flex-col items-center justify-between rounded-2xl py-9 ${available ? "opacity-100" : "opacity-70"} px-4`}>
            <div className="flex flex-col items-center">
                <h1 className={`w-full font-bold ${available ? "bg-[#629764] text-white" : "bg-[#EC7575] line-through"}  px-10 py-1 rounded-md ` }>{name}</h1>
                <p className="text-white font-medium italic">{location}</p>
                {available ? <p>Disponível</p> : <p className="text-[#ec0b0b] font-extrabold">Indisponível</p>}
            </div>

            <button className={`w-2/3 bg-[#629764] text-white font-bold py-2 px-4 rounded-md mt-4 cursor-pointer ${!available ? "hidden" : ""}`}>Reservar</button>
        </div>
    )
}