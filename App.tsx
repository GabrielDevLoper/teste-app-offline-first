import React from "react";
import { StatusBar } from "react-native";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import "react-native-gesture-handler";
import { NavigationDrawer } from "./src/navigation";
import AppLoading from "expo-app-loading";
import { FuncionarioProvider } from "./src/hooks/useFuncionario";
import { SetorProvider } from "./src/hooks/useSetor";
import { NetProvider } from "./src/hooks/useNetStatus";
import { AppearanceProvider } from "react-native-appearance";
import { AuthProvider } from "./src/hooks/useAuth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  return (
    <>
      {!fontsLoaded ? (
        <AppLoading />
      ) : (
        <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <AppearanceProvider>
            <NetProvider>
              <FuncionarioProvider>
                <SetorProvider>
                  <NavigationDrawer />
                </SetorProvider>
              </FuncionarioProvider>
            </NetProvider>
          </AppearanceProvider>
        </>
      )}
    </>
  );
}
