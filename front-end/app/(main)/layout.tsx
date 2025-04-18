import Image from "next/image";
import logo from "../../public/images/logo.png";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="pt-br">
        <body className="w-full h-screen">
            <header className="flex flex-row justify-between items-center p-3 bg-[#629764]  px-14">
                <Image src={logo} alt="logo" className="w-18"/>
                <button className="text-white cursor-pointer font-bold">logout</button>
            </header>
            {children}
        </body>
      </html>
    );
  }