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
}

const SetorContext = createContext<SetorContextProps>({} as SetorContextProps);

export function SetorProvider({ children }: SetorProviderProps) {
  const [loading, setLoading] = useState(false);
  const [setores, setSetores] = useState<Setores[]>([]);
  const [setoresOffline, setSetoresOffline] = useState<Setores[]>([]);
  const [setoresItermediadores, setSetoresItermediadores] = useState<Setores[]>(
    []
  );

  const [nome, setNome] = useState("");

  const net = NetInfo.useNetInfo().isConnected;
  // const net = false;

  async function carregarSetoresOffline() {
    const tempsetores = await AsyncStorage.getItem("@setores_offline");
    if (tempsetores) {
      setSetoresOffline(JSON.parse(tempsetores));
      setSetoresItermediadores([...setores, JSON.parse(tempsetores)]);
      return;
    }
  }

  async function carregarSetoresOnline() {
    const { data } = await api.get("setores");
    setSetores(data);
    await AsyncStorage.setItem("@setores_online", JSON.stringify(data));
  }

  useEffect(() => {
    carregarSetoresOffline();
  }, [net]);

  useEffect(() => {
    carregarSetoresOnline();
  }, []);

  async function handleSalvar() {
    try {
      setLoading(true);
      if (!net) {
        const data_setor = {
          id: uuid.v4().toString(),
          nome,
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
