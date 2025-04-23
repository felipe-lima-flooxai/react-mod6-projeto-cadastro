import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import { useEffect, useState } from "react";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [clientes, setClientes] = useState<Cliente[]>([])

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela")


  function obterTodos(){
    repo.obterTodos().then(clientes => {setClientes(clientes); setVisivel("form")})
  }

  useEffect(obterTodos, [])

  


  function clienteSelecionado(cliente: Cliente){
    setCliente(cliente)
    setVisivel("form")
  }
  
  function clienteExcluido(cliente: Cliente) {
    repo.excluir(cliente)
      .then(() => {
        // Atualiza a lista após excluir
        repo.obterTodos().then(setClientes);
        setVisivel("tabela");
      })
      .catch(err => console.error("Erro ao excluir cliente:", err));
  }
  
  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
      .then(clienteSalvo => {
        // Atualiza a lista após salvar
        repo.obterTodos().then(setClientes);
        setVisivel("tabela");
      })
      .catch(err => console.error("Erro ao salvar cliente:", err));
  }

  function novoCliente(){
    setCliente(Cliente.vazio())
    setVisivel("form")

  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        {visivel === "tabela" ? 
        (<>
          <div className="flex justify-end" >
            <Botao className="mb-4" cor="blue" onClick={ novoCliente }>
              novoCliente
            </Botao>
          </div>
          <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido}></Tabela>
        </>) : 
        (
          <Formulario cliente={cliente} cancelado={()=>setVisivel("tabela")} clienteMudou={salvarCliente}></Formulario>
          )}
        
        
      </Layout>
    </div>
  );
}
