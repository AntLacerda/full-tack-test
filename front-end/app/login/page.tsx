import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import LoginForm from "@/components/login/login-form";

export default function Login() {
    return (
        <div className="bg-[url('/images/login.png')] bg-cover w-full h-screen">
            <main className="w-full h-screen flex flex-row-reverse">
                <div className="flex flex-row justify-center items-center w-1/2 h-full">
                    <div className="flex flex-col justify-center items-center bg-white w-3/4 h-9/10 rounded-2xl">
                        <div className="flex flex-col justify-center items-center p-3">
                            <Image src={logo} alt="logo" className="w-22"/>
                            <h2 className="text-5xl font-extrabold mb-1.5">Login</h2>
                            <p className="mb-6">Entre no sistema e reserve sua quadra já!</p>
                        
                            <LoginForm/>

                            <p>Não possui conta? <Link href={"/login"} className="font-bold text-[#629764]">Cadastre-se</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}