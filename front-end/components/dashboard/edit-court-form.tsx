"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { notFound, useRouter, useParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { editCourt, findCourtById } from "@/lib/court";
import { Court } from "@/types/courts";

const createCourtSchema = z.object({
    name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
    address: z.string().min(3, "Endereço deve conter pelo menos 3 caracteres"),
    available: z.boolean().optional(),
});

type CreateCourtFormData = z.infer<typeof createCourtSchema>;



export default function EditCourtForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"sucess" | "error" | null>(null);
    const { register, handleSubmit, formState: { errors}, reset} = useForm<CreateCourtFormData>({resolver: zodResolver(createCourtSchema), defaultValues: {name: "", address: "", available: false}});
    const [atualCourt, setAtualCourt] = useState<Court | null>(null);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const court = await findCourtById(params.id as string);

                if(court) {
                    setAtualCourt(court);
                    reset({
                        name: court.name,
                        address: court.location,
                        available: court.available
                    });
                } else {
                    notFound();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                notFound();
            }
        }

        fetchData();
    }, [params.id, reset])

    const onSubmit = async (data: CreateCourtFormData) => {
        setIsSubmitting(true);
        setFeedbackMessage(null);
        setFeedbackType(null);

        try {
            await editCourt(atualCourt?.id as string, data.name, data.address, data.available as boolean);
            
            setFeedbackType("sucess");
            setFeedbackMessage("Quadra editada com sucesso!");
            
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error) {
            setFeedbackType("error");
            setFeedbackMessage(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!");
        }

        setIsSubmitting(false);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 flex flex-col gap-2">
            {
                feedbackMessage && (
                    <div className={`absolute top-8 right-10 w-fit p-4 pr-6 rounded-md text-black border-r-8 bg-white ${feedbackType === "sucess" ? "border-green-500" : "border-red-500"}`}>
                        <div className="flex flex-row items-center gap-2">
                            {feedbackType === "sucess" ? <CheckCircleIcon className="w-6 h-6 text-[#629764]" /> : <XCircleIcon className="w-6 h-6 text-[#FF0000]" />}
                            {feedbackMessage}
                        </div>
                    </div>
                )
            }

            <div className="flex flex-col w-full">
                <label htmlFor="name" className="font-bold">Nome:</label>

                <input
                    {...register("name")}
                    type="text"
                    id="name"
                    placeholder={atualCourt?.name}
                    className="border-2 rounded-md p-2 mt-1.5 pl-5 border-gray-300"
                />

                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="address" className="font-bold">Endereço:</label>

                <input
                    {...register("address")}
                    type="text"
                    id="address"
                    placeholder={atualCourt?.location}
                    className="border-2 rounded-md p-2 mt-1.5 pl-5 border-gray-300"
                />

                {errors.address && <span className="text-red-500">{errors.address.message}</span>}
            </div>

            <div className="flex flex-row items-center gap-2 mt-1.5">
                <input type="checkbox" id="checkbox" className="w-4 h-4" {...register("available")} />
                <label htmlFor="checkbox">Quadra está disponível?</label>
            </div>

            <button type="submit" className="bg-[#629764] w-full text-white rounded-md p-2 mt-3 font-bold mb-1.5 cursor-pointer hover:bg-[#4b6f4b] transition duration-300" disabled={isSubmitting}>{isSubmitting ? "Editando..." : "Editar"}</button>
        </form>
    )
}