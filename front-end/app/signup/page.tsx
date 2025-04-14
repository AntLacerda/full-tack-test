import Image from "next/image"
import logo from "../../public/images/logo.png";
import Link from "next/link";

export default function Signup() {
    return (
        <div className="bg-[url('/images/signup.png')] bg-cover w-full h-screen">
            <main className="w-full h-screen">
                <div className=" flex flex-row justify-center items-center w-1/2 h-full ">
                    <div className="flex flex-col justify-center items-center bg-white w-3/4 h-7/8 rounded-2xl">
                        <div className="flex flex-col justify-center items-center p-5">
                            <Image src={logo} alt="logo" />
                            <h2 className="text-5xl font-extrabold">Criar Conta</h2>
                            <p>Crie sua conta para acessar nosso sistema!</p>
                            
                            
                            
                            <p>Já possui conta? <Link href={"/login"} className="font-bold text-[#629764]">Clique aqui</Link></p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}