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

const Drawer = createDrawerNavigator();

export function NavigationDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Sair"
        statusBarAnimation="fade"
        drawerContentOptions={{
          activeTintColor: "#2196F3",
        }}
        drawerType="slide"
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
    </NavigationContainer>
  );
}
