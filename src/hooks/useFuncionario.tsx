import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";
import { api } from "../services/api";

interface Funcionarios {
  id?: number;
  nome: string;
  cpf: string;
  id_setor: number;
  data_nascimento: string;
  created_at: Date;
  updated_at: Date;
}

interface Setores {
  id?: number;
  nome: string;
  created_at: Date;
  updated_at: Date;
}

interface FuncionarioContextProps {
  loading: boolean;
  funcionariosOffline: Funcionarios[];
  funcionariosOnline: Funcionarios[];
  setoresOffline: Setores[];
  setores: Setores[];
  net: boolean;
  sycronizeFuncionarios: () => void;
  handleSalvar: (
    nome: string,
    data_nascimento: string,
    cpf: string,
    id_setor: number
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

  const [setores, setSetores] = useState<Setores[]>([]);
  const [setoresOffline, setSetoresOffline] = useState<Setores[]>([]);

  const net = NetInfo.useNetInfo().isConnected;
  // const net = false;

  useEffect(() => {
    async function initFuncOffline() {
      const funcOffline = await AsyncStorage.getItem("@funcionario_offline");
      if (funcOffline) {
        return setFuncionariosOffline(JSON.parse(funcOffline));
      }

      return setFuncionariosOffline([]);
    }

    async function initSetoresOffline() {
      // const setoresOffline = [...setores];
      const tempsetores = await AsyncStorage.getItem("@setores_offline");
      if (tempsetores) {
        return setSetores(JSON.parse(tempsetores));
      }

      return setSetores([]);
    }

    initSetoresOffline();
    initFuncOffline();
  }, [net]);

  useEffect(() => {
    async function loadSetores() {
      const { data } = await api.get("/api/setores");
      setSetores(data);
      await AsyncStorage.setItem("@setores_offline", JSON.stringify(data));
    }

    async function loadFuncionariosOnline() {
      setLoading(true);
      const { data } = await api.get("/api/usuarios");
      setFuncionariosOnline(data);

      setLoading(false);
    }

    loadSetores();
    loadFuncionariosOnline();
  }, []);

  async function sycronizeFuncionarios() {
    setLoading(true);
    const { data } = await api.get<Funcionarios[]>("/api/usuarios");
    setFuncionariosOnline(data);
    setLoading(false);

    console.log(funcionariosOnline.length);

    if (funcionariosOnline.length == undefined) {
      console.log("oláa sincronize");
      setLoading(true);

      funcionariosOffline.map(async (func) => {
        const { data } = await api.post<Funcionarios>("/api/usuarios", func);
        console.log(data);
      });

      setFuncionariosOffline([]);
      await AsyncStorage.removeItem("@funcionario_offline");
      Alert.alert("", "Sincronização realizada com sucesso ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      setLoading(false);

      return;
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

    if (removeFuncUndefined) {
      try {
        setLoading(true);
        removeFuncUndefined.map(async (func) => {
          const { data } = await api.post<Funcionarios>("/api/usuarios", func);
        });
        setFuncionariosOffline([]);
        await AsyncStorage.removeItem("@funcionario_offline");
        Alert.alert("", "Sincronização realizada com sucesso ✅", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setLoading(false);
      } catch {
        setLoading(false);

        Alert.alert("", "Erro na sincronização", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  }

  async function handleSalvar(
    nome: string,
    data_nascimento: string,
    cpf: string,
    id_setor: number
  ) {
    // console.log(removeFuncUndefined);

    const datas = {
      nome,
      data_nascimento,
      cpf,
      id_setor,
    };

    //const response = await api.get("/api/usuarios");
    try {
      setLoading(true);

      if (!net) {
        if (
          nome.length === 0 ||
          data_nascimento.length === 0 ||
          id_setor === 0
        ) {
          Alert.alert("", "Erro ao cadastrar funcionário   ❌", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);

          setLoading(false);

          return;
        }

        const dataOffline = {
          ...datas,
          created_at: new Date(),
          updated_at: new Date(),
        };

        const updateFuncionariosOffline = [...funcionariosOffline];

        updateFuncionariosOffline.push(dataOffline);
        await AsyncStorage.setItem(
          "@funcionario_offline",
          JSON.stringify(updateFuncionariosOffline)
        );

        setFuncionariosOffline(updateFuncionariosOffline);

        setLoading(false);

        Alert.alert("", "Sucesso ao cadastrar funcionário ✅", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);

        return;
      }

      const { data } = await api.post<Funcionarios>("/api/usuarios", datas);
      setLoading(false);

      Alert.alert("", "Sucesso ao cadastrar funcionário ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch {
      setLoading(false);

      Alert.alert("", "Erro ao cadastrar funcionário   ❌", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
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
        setores,
        setoresOffline,
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
