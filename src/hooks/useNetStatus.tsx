import React, { useContext, createContext, ReactNode } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

interface NetContextProps {
  net: boolean;
}

interface NetProviderProps {
  children?: ReactNode;
}

const NetContext = createContext<NetContextProps>({} as NetContextProps);

export function NetProvider({ children }: NetProviderProps) {
  let net = useNetInfo().isConnected;
  // let net = true;

  return <NetContext.Provider value={{ net }}>{children}</NetContext.Provider>;
}

export function useNetStatus(): NetContextProps {
  const context = useContext(NetContext);

  return context;
}
