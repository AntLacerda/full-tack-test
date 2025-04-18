import EditCourtForm from "@/components/dashboard/edit-court-form"
import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export default function EditCourt() {
    return( 
        <main className="w-full flex flex-col p-6">
            <div>
                <Link href="/dashboard">
                    <ArrowLeftIcon className="w-6 h-6"/>
                </Link>
                <h1 className="text-5xl font-bold mb-3">Editar Quadra</h1>
                <p>Preencha os dados necessários para criar uma nova quadra!</p>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <EditCourtForm/>
            </div>
        </main>
    )
}