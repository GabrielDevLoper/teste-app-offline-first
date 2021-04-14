import AsyncStorage from "@react-native-async-storage/async-storage";

import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { api } from "../services/api";

interface AuthLogado {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

interface AuthContextProps {
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  logado: boolean;
  loadingAuth: boolean;
  nome: string;
}

interface AuthProviderProps {
  children: ReactNode;
  navigation: any;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children, navigation }: AuthProviderProps) {
  const [logado, setLogado] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function loadToken() {
      const token = await AsyncStorage.getItem("@token");
      const nome = await AsyncStorage.getItem("@nome");

      if (nome) {
        setNome(nome);
      }

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setLogado(true);
        navigation.current?.navigate("Home");
      }

      setLoadingAuth(false);
    }

    loadToken();
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      setLoadingAuth(true);
      const { data } = await api.post<AuthLogado>("sessions", {
        email,
        password,
      });

      const {
        token,
        user: { name },
      } = data;

      console.log(data);

      if (token) {
        await AsyncStorage.setItem("@token", JSON.stringify(token));
        await AsyncStorage.setItem("@nome", name);
        setNome(name);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLogado(true);
        navigation.current?.navigate("Home");
      }

      setLoadingAuth(false);
    } catch {
      setLoadingAuth(false);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha ao tentar logar👋",
        topOffset: 40,
        bottomOffset: 40,
      });
    }
  }

  async function handleLogout() {
    setLogado(false);
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@nome");
    api.defaults.headers.Authorization = undefined;
    navigation.current?.navigate("Sair");
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        logado,
        loadingAuth,
        nome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuths(): AuthContextProps {
  const context = useContext(AuthContext);

  return context;
}
