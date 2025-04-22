import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const clientes = [
    new Cliente("Ana", 34, "1"),
    new Cliente("Bruno", 28, "2"),
    new Cliente("Carla", 45, "3"),
    new Cliente("Daniel", 52, "4"),
    new Cliente("Eduarda", 31, "5"),
    new Cliente("Felipe", 40, "6"),
    new Cliente("Gabriela", 23, "7"),
    new Cliente("Henrique", 37, "8"),
    new Cliente("Isabela", 29, "9"),
    new Cliente("João", 50, "10"),
  ];

  function clienteSelecionado(cliente: Cliente){
    console.log(cliente.nome)
  }
  
  function clienteExcluido(cliente: Cliente){
    console.log(cliente.nome)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido}></Tabela>
      </Layout>
    </div>
  );
}
