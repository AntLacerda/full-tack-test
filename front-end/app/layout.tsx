import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Tennis Club Arena",
  description: "A um clique de sua diversão!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${montserrat} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
