import { useNetInfo } from "@react-native-community/netinfo";
import { useContext, createContext, ReactNode } from "react";

interface NetContextProps {
  net: boolean;
}

interface NetProviderProps {
  children?: ReactNode;
}

const NetContext = createContext<NetContextProps>({} as NetContextProps);

export function NetProvider({ children }: NetProviderProps) {
  let net = useNetInfo().isConnected;

  return <NetContext.Provider value={{ net }}>{children}</NetContext.Provider>;
}

export function useNetStatus(): NetContextProps {
  const context = useContext(NetContext);

  return context;
}
