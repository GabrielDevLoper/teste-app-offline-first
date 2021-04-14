import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";
import { api } from "../services/api";
import { useNetStatus } from "./useNetStatus";
import Toast from "react-native-toast-message";

interface Funcionarios {
  id?: string;
  nome: string;
  cpf: string;
  id_setor: string;
  data_nascimento: string;
  created_at: Date;
  updated_at: Date;
}

interface FuncionarioContextProps {
  loading: boolean;
  funcionariosOffline: Funcionarios[];
  funcionariosOnline: Funcionarios[];
  net: boolean;
  sycronizeFuncionarios: () => void;
  handleSalvar: (
    nome: string,
    data_nascimento: string,
    cpf: string,
    id_setor: string
  ) => void;
}

interface FuncionarioProviderProps {
  children: ReactNode;
}

const FuncionarioContext = createContext<FuncionarioContextProps>(
  {} as FuncionarioContextProps
);

export function FuncionarioProvider({ children }: FuncionarioProviderProps) {
  const [loading, setLoading] = useState(false);
  const [funcionariosOffline, setFuncionariosOffline] = useState<
    Funcionarios[]
  >([]);

  const [funcionariosOnline, setFuncionariosOnline] = useState<Funcionarios[]>(
    []
  );

  const { net } = useNetStatus();

  useEffect(() => {
    async function initFuncOffline() {
      const funcOffline = await AsyncStorage.getItem("@funcionario_offline");
      if (funcOffline) {
        return setFuncionariosOffline(JSON.parse(funcOffline));
      }

      return setFuncionariosOffline([]);
    }

    initFuncOffline();
  }, [net]);

  useEffect(() => {
    async function loadFuncionariosOnline() {
      setLoading(true);
      const { data } = await api.get("/funcionarios");
      setFuncionariosOnline(data);

      setLoading(false);
    }

    loadFuncionariosOnline();
  }, []);

  async function sycronizeFuncionarios() {
    setLoading(true);
    const { data } = await api.get<Funcionarios[]>("/funcionarios");
    setFuncionariosOnline(data);
    setLoading(false);

    if (funcionariosOnline.length == 0) {
      try {
        setLoading(true);

        funcionariosOffline.map(async (func) => {
          const response = await api.post<Funcionarios>("/funcionarios", func);
          console.log(response);
        });

        setFuncionariosOffline([]);
        await AsyncStorage.removeItem("@funcionario_offline");
        Toast.show({
          type: "success",
          text1: "Sincronizado",
          text2: "Sucesso ao sincronizar os dados 🥳",
          topOffset: 100,
          bottomOffset: 40,
        });
        setLoading(false);

        return;
      } catch {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Erro na sincronização",
          topOffset: 100,
          bottomOffset: 40,
        });
      }
    }

    // recebendo todos os cpf dos usuarios que estão inseridos na api;
    const getCpf = funcionariosOnline.map((func) => {
      return func.cpf;
    });

    // verificando se ja existe usuarios na api, antes de sincronizar.
    const matchFuncionarios = funcionariosOffline.map((func) => {
      if (!getCpf.includes(func.cpf)) {
        return func;
      }
    });

    // função elimina todos os objetos undefined e retorna somente
    // os funcionarios que não existe, evitando erro e duplicação
    const removeFuncUndefined = matchFuncionarios.filter((func) => {
      return func != null;
    });

    console.log(removeFuncUndefined);

    try {
      if (removeFuncUndefined) {
        setLoading(true);
        removeFuncUndefined.map(async (func) => {
          const { data } = await api.post<Funcionarios>("funcionarios", func);
          console.log(data);

          setFuncionariosOnline([...funcionariosOnline, data]);
        });
        setFuncionariosOffline([]);
        await AsyncStorage.removeItem("@funcionario_offline");
        Toast.show({
          type: "success",
          text1: "Sincronizado",
          text2: "Sucesso ao sincronizar os dados 🥳",
          topOffset: 100,
          bottomOffset: 40,
        });
        setLoading(false);
      }
    } catch {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro na sincronização",
        topOffset: 100,
        bottomOffset: 40,
      });
    }
  }

  async function handleSalvar(
    nome: string,
    data_nascimento: string,
    cpf: string,
    id_setor: string
  ) {
    // console.log(removeFuncUndefined);

    const datas = {
      nome,
      data_nascimento,
      cpf,
      id_setor,
    };

    try {
      setLoading(true);

      if (!net) {
        const dataOffline = {
          ...datas,
          created_at: new Date(),
          updated_at: new Date(),
        };

        const updateFuncionariosOffline = [...funcionariosOffline];

        updateFuncionariosOffline.push(dataOffline);

        setFuncionariosOffline(updateFuncionariosOffline);

        await AsyncStorage.setItem(
          "@funcionario_offline",
          JSON.stringify(updateFuncionariosOffline)
        );

        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Sucesso ao cadastrar o funcionário",
          topOffset: 100,
          bottomOffset: 40,
        });

        return;
      }

      const { data } = await api.post("funcionarios", datas);

      setLoading(false);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Sucesso ao cadastrar o funcionário",
        topOffset: 100,
        bottomOffset: 40,
      });
    } catch {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao tentar cadastrar o funcionario",
        topOffset: 100,
        bottomOffset: 40,
      });
    }
  }

  return (
    <FuncionarioContext.Provider
      value={{
        funcionariosOffline,
        funcionariosOnline,
        sycronizeFuncionarios,
        handleSalvar,
        loading,
        net,
      }}
    >
      {children}
    </FuncionarioContext.Provider>
  );
}

export function useFuncionario(): FuncionarioContextProps {
  const context = useContext(FuncionarioContext);

  return context;
}
