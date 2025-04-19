"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/lib/login"
import { EyeIcon, EyeSlashIcon  } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Cookies from "js-cookie";

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"sucess" | "error" | null>(null);
    const { register, handleSubmit, formState: { errors}} = useForm<LoginFormData>({resolver: zodResolver(loginSchema)});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        setFeedbackMessage(null);
        setFeedbackType(null);

        try {
            const { token } = await login(data.email, data.password);

            Cookies.set("token", token, { expires: 7, secure: true });

            setFeedbackType("sucess");
            setFeedbackMessage("Logado com sucesso!");
            
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            setFeedbackType("error");
            setFeedbackMessage(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!");
        }

        setIsSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-full h-full">
            {
                feedbackMessage && (
                    <div className={`absolute top-10 left-10 w-fit p-4 pr-6 rounded-md text-black border-l-8 bg-white ${feedbackType === "sucess" ? "border-green-500" : "border-red-500"}`}>
                        <div className="flex flex-row items-center gap-2">
                            {feedbackType === "sucess" ? <CheckCircleIcon className="w-6 h-6 text-[#629764]" /> : <XCircleIcon className="w-6 h-6 text-[#FF0000]" />}
                            {feedbackMessage}
                        </div>
                    </div>
                )
            }

            <div className="flex flex-col w-full">
                <label htmlFor="email" className="font-bold">Email:</label>
                
                <input
                    {...register("email")}
                    type="text"
                    id="email"
                    placeholder="Exemplo@hotmail.com"
                    className="border-2 rounded-md p-2 mt-1.5 pl-5 border-gray-300"
                />

                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col w-full mb-9">
                <label htmlFor="password" className="font-bold">Senha:</label>
                
                <div className="flex flex-row relative w-full justify-center items-center">
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Digite a senha novamente..."
                        className="border-2 rounded-md p-2 w-full mt-1.5 pl-5 border-gray-300"
                    />

                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeSlashIcon className="w-6 h-6 absolute right-3 bottom-2 hover:cursor-pointer text-gray-300" /> : <EyeIcon className="w-6 h-6 absolute right-3 bottom-2 hover:cursor-pointer text-gray-300" />}
                    </button>
                </div>

                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        
            </div>

            <button type="submit" className="bg-[#629764] w-full text-white rounded-md p-2 mt-3 font-bold mb-1.5 hover:cursor-pointer hover:bg-[#4b6f4b] transition duration-300" disabled={isSubmitting} >{isSubmitting ? "Entrando..." : "Entrar"}</button>
        </form>
    )
}