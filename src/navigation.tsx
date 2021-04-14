import React from "react";
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

//Páginas
import { Funcionarios } from "./pages/Funcionarios";
import { CadastroFuncionario } from "./pages/Funcionarios/Cadastro";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Setores } from "./pages/Setores";
import { CadastroSetor } from "./pages/Setores/Cadastro";
import { DrawerContent } from "./components/DrawerContent";
import { AuthProvider } from "./hooks/useAuth";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";

const Drawer = createDrawerNavigator();

const toastConfig = {
  success: ({ text1, text2, ...rest }: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "#91ff35", backgroundColor: "#76d825" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      onPress={() => Toast.hide()}
      activeOpacity={20}
    />
  ),
  error: ({ text1, text2, ...rest }: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: "#ff4569",
        backgroundColor: "#ff1744",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      onPress={() => Toast.hide()}
      activeOpacity={20}
    />
  ),

  ok: ({ text1, text2, ...rest }: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: "#ff4569",
        backgroundColor: "rgb(109, 77, 224)",
        
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text1={text1}
      text2={text2}
      onPress={() => Toast.hide()}
      activeOpacity={20}
    />
  ),
};

export function NavigationDrawer() {
  const navigationRef = React.useRef(null);

  function AuthRoutes() {
    return (
      <AuthProvider navigation={navigationRef}>
        <Drawer.Navigator
          drawerType="slide"
          initialRouteName="Sair"
          statusBarAnimation="fade"
          screenOptions={{}}
          drawerContentOptions={{
            activeTintColor: "#2196F3",
            labelStyle: {
              color: "white",
            },
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={Home} />

          <Drawer.Screen name="Funcionarios" component={Funcionarios} />

          <Drawer.Screen
            name="Cadastrar Funcionario"
            component={CadastroFuncionario}
          />

          <Drawer.Screen name="Setores" component={Setores} />

          <Drawer.Screen name="Cadastrar Setor" component={CadastroSetor} />

          <Drawer.Screen
            name="Sair"
            component={SignIn}
            options={{
              swipeEnabled: false,
            }}
          />
        </Drawer.Navigator>
      </AuthProvider>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthRoutes />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
