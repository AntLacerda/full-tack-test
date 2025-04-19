import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[url('/images/home.png')] bg-cover w-full h-screen bg-center flex flex-col items-center justify-center">
        <Link href={"/login"} className="mt-46">
          <button className="bg-[#629764] text-white font-bold py-2 px-4 rounded-md cursor-pointer hover:bg-[#4b6f4b] transition duration-300">Começar</button>
        </Link>
    </div>
  );
}
