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

      Alert.alert("", "Setores sincronizados com sucesso ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

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

        Alert.alert("", "Setor cadastrado com sucesso, em modo offline ✅", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);

        setLoading(false);

        carregarSetoresOffline();

        return;
      }

      const { data } = await api.post<Setores>("setores", { nome });

      setSetores([...setores, data]);
      carregarSetoresOnline();

      setNome("");

      Alert.alert("", "Setor cadastrado com sucesso ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert("", "Erro ao cadastrar setor   ❌", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
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
