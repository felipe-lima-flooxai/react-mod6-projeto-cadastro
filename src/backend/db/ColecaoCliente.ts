import { db } from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  CollectionReference
} from "firebase/firestore";

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    }
  };

  private colecao(): CollectionReference<Cliente> {
    return collection(db, "clientes").withConverter(this.#conversor);
  }

async salvar(cliente: Cliente): Promise<Cliente> {
  if (cliente?.id) {
    const docRef = doc(db, "clientes", cliente.id).withConverter(this.#conversor);
    await setDoc(docRef, cliente);
    return cliente;
  } else {
    const docRef = await addDoc(this.colecao(), cliente);
    const docSnap = await getDoc(docRef);
    return docSnap.data()!;
  }
}

  async excluir(cliente: Cliente): Promise<void> {
    if (cliente.id) {
      const docRef = doc(db, "clientes", cliente.id).withConverter(this.#conversor);
      await deleteDoc(docRef);
    }
  }

  async obterTodos(): Promise<Cliente[]> {
    try {
      const querySnap = await getDocs(this.colecao());
      return querySnap.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Erro ao obter clientes:", error);
      return [];
    }
  }
}