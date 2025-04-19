import Image from "next/image"
import logo from "../../public/images/logo.png";
import Link from "next/link";
import SignUpForm from "@/components/signup/signup-form";

export default function Signup() {
    return (
        <div className="bg-[url('/images/signup.png')] bg-cover w-full h-screen">
            <main className="w-full h-screen">
                <div className=" flex flex-row justify-center items-center w-1/2 h-full ">
                    <div className="flex flex-col justify-center items-center bg-white w-3/4 h-9/10 rounded-2xl">
                        <div className="flex flex-col justify-center items-center p-3">
                            <Image src={logo} alt="logo" className="w-18"/>
                            <h2 className="text-5xl font-extrabold">Criar Conta</h2>
                            <p>Crie sua conta para acessar nosso sistema!</p>
                            
                            <SignUpForm/>
                            
                            <p>Já possui conta? <Link href={"/login"} className="font-bold text-[#629764] underline">Clique aqui</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}