import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import uuid from "react-native-uuid";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";
import { Alert } from "react-native";
import { useNetStatus } from "./useNetStatus";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

interface SetorProviderProps {
  children?: ReactNode;
}

interface Setores {
  id?: string;
  nome: string;
  created_at: Date;
  updated_at: Date;
}

interface SetorContextProps {
  loading: boolean;
  handleSalvar: () => void;
  setoresItermediadores: Setores[];
  setoresOffline: Setores[];
  setores: Setores[];
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  carregarSetoresOnline: () => void;
  sycronizeSetores: () => void;
}

const SetorContext = createContext<SetorContextProps>({} as SetorContextProps);

export function SetorProvider({ children }: SetorProviderProps) {
  const { net } = useNetStatus();

  const [loading, setLoading] = useState(false);
  const [setores, setSetores] = useState<Setores[]>([]);
  const [setoresOffline, setSetoresOffline] = useState<Setores[]>([]);
  const [setoresItermediadores, setSetoresItermediadores] = useState<Setores[]>(
    []
  );

  const [nome, setNome] = useState("");

  async function carregarSetoresOffline() {
    const setoresOfflineTemp = await AsyncStorage.getItem("@setores_offline");
    const setoresOnlineTemp = await AsyncStorage.getItem("@setores_online");

    if (setoresOfflineTemp && setoresOnlineTemp) {
      setSetoresOffline(JSON.parse(setoresOfflineTemp));
      setSetoresItermediadores([
        ...JSON.parse(setoresOnlineTemp),
        ...JSON.parse(setoresOfflineTemp),
      ]);

      return;
    }

    if (setoresOnlineTemp) {
      setSetoresItermediadores([...JSON.parse(setoresOnlineTemp)]);

      return;
    }

    return setSetoresOffline([]);
  }

  async function carregarSetoresOnline() {
    if (net) {
      setLoading(true);

      const { data } = await api.get("setores");
      setSetores(data);
      await AsyncStorage.setItem("@setores_online", JSON.stringify(data));
      setLoading(false);

      return;
    }
  }

  useEffect(() => {
    carregarSetoresOffline();
  }, [net]);

  useEffect(() => {
    carregarSetoresOnline();
  }, [net]);

  async function sycronizeSetores() {
    carregarSetoresOnline();

    if (setores.length === 0) {
      setLoading(true);
      setoresOffline.map(async (setor) => {
        const { data } = await api.post<Setores>("setores", setor);

        setSetores([...setores, data]);
      });

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Sincronização realizada com sucesso",
        topOffset: 100,
        bottomOffset: 40,
      });

      setSetoresOffline([]);
      await AsyncStorage.removeItem("@setores_offline");
      setLoading(false);

      return;
    }

    // recebendo todos os cpf dos usuarios que estão inseridos na api;
    const getUniqueNome = setores.map((setor) => {
      return setor.nome;
    });

    // verificando se ja existe usuarios na api, antes de sincronizar.
    const matchSetores = setoresOffline.map((setor) => {
      if (!getUniqueNome.includes(setor.nome)) {
        return setor;
      }
    });

    // função elimina todos os objetos undefined e retorna somente
    // os funcionarios que não existe, evitando erro e duplicação
    const removeSetorUndefined = matchSetores.filter((setor) => {
      return setor != null;
    });

    if (removeSetorUndefined) {
      try {
        setLoading(true);
        removeSetorUndefined.map(async (setor) => {
          const { data } = await api.post<Setores>("/setores", setor);
          setSetores([...setores, data]);
        });
        setSetoresOffline([]);
        await AsyncStorage.removeItem("@setores_offline");
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Sincronização realizada com sucesso",
          topOffset: 100,
          bottomOffset: 40,
        });

        setLoading(false);
      } catch {
        setLoading(false);

        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Erro ao tentar sincronizar",
          topOffset: 100,
          bottomOffset: 40,
        });
      }
    }
  }

  async function handleSalvar() {
    try {
      setLoading(true);
      if (!net) {
        const data_setor = {
          id: uuid.v4().toString(),
          nome: nome.toLowerCase(),
          created_at: new Date(),
          updated_at: new Date(),
        };

        const updateSetoresOffline = [...setoresOffline];

        updateSetoresOffline.push(data_setor);

        setSetoresOffline(updateSetoresOffline);

        await AsyncStorage.setItem(
          "@setores_offline",
          JSON.stringify(updateSetoresOffline)
        );

        setNome("");

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Sucesso ao cadastrar o setor",
          topOffset: 100,
          bottomOffset: 40,
        });

        setLoading(false);

        carregarSetoresOffline();

        return;
      }

      const { data } = await api.post<Setores>("setores", { nome });

      setSetores([...setores, data]);
      carregarSetoresOnline();

      setNome("");
      setLoading(false);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Sucesso ao cadastrar o setor",
        topOffset: 100,
        bottomOffset: 40,
      });
    } catch {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao tentar cadastrar o setor",
        topOffset: 100,
        bottomOffset: 40,
      });
    }
  }

  return (
    <SetorContext.Provider
      value={{
        handleSalvar,
        setores,
        setoresItermediadores,
        setoresOffline,
        setNome,
        nome,
        loading,
        sycronizeSetores,
        carregarSetoresOnline,
      }}
    >
      {children}
    </SetorContext.Provider>
  );
}

export function useSetor(): SetorContextProps {
  const context = useContext(SetorContext);

  return context;
}
