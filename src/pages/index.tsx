import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500
     to-purple-500 text-white">
      <Layout titulo="Cadastro Simples"><span>Conteudo</span></Layout>
    </div>
  );
}
