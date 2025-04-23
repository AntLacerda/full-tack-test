"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import confirmPassword from "@/lib/utils/confirm-password";
import signup from "@/lib/signup";
import { EyeIcon, EyeSlashIcon  } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

const signupSchema = z.object({
    name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Senha deve conter pelo menos 6 caracteres"),
    adminAccount: z.boolean(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"sucess" | "error" | null>(null);
    const { register, handleSubmit, formState: { errors}} = useForm<SignupFormData>({resolver: zodResolver(signupSchema)});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: SignupFormData) => {
        if(!confirmPassword(data.password, data.confirmPassword)) {
            setFeedbackType("error");
            setFeedbackMessage("As senhas não coincidem!");
            return;
        }

        setIsSubmitting(true);
        setFeedbackMessage(null);
        setFeedbackType(null);

        try {
            await signup(data.name, data.email, data.password, data.adminAccount);

            setFeedbackType("sucess");
            setFeedbackMessage("Cadastrado com sucesso!");
            
            setTimeout(() => {
                router.push("/login");
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
                    <div className={`absolute top-10 right-10 w-fit p-4 pr-6 rounded-md text-black border-r-8 bg-white ${feedbackType === "sucess" ? "border-green-500" : "border-red-500"}`}>
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
                    placeholder="Digite seu nome..."
                    className="border-2 rounded-md p-2 mt-1.5 pl-5 border-gray-300"
                />

                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

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

            <div className="flex flex-col w-full">
                <label htmlFor="password" className="font-bold">Senha:</label>
                
                <input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Digite a sua senha..."
                    className="border-2 rounded-md p-2 mt-1.5 pl-5 border-gray-300"
                />

                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            
            <div className="flex flex-col w-full">
                <label htmlFor="confirmPassword" className="font-bold">Senha novamente:</label>
                
                <div className="flex flex-row relative w-full justify-center items-center">
                    <input
                        {...register("confirmPassword")}
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Digite a senha novamente..."
                        className="border-2 rounded-md p-2 w-full mt-1.5 pl-5 border-gray-300"
                    />

                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeSlashIcon className="w-6 h-6 absolute right-3 bottom-2 hover:cursor-pointer text-gray-300" /> : <EyeIcon className="w-6 h-6 absolute right-3 bottom-2 hover:cursor-pointer text-gray-300" />}
                    </button>
                </div>

                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>

            <div className="flex flex-row items-center gap-2 mt-1.5">
                <input type="checkbox" id="checkbox" className="w-4 h-4" {...register("adminAccount")}/>
                <label htmlFor="checkbox">Cadastrar como administrador?</label>
            </div>

            <button type="submit" className="bg-[#629764] w-full text-white rounded-md p-2 mt-3 font-bold mb-1.5 hover:cursor-pointer hover:bg-[#4b6f4b] transition duration-300" disabled={isSubmitting}>{isSubmitting ? "Cadastrando..." : "Cadastrar"}</button>
        </form>
    )
}