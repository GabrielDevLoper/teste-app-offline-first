import React from "react";
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

//Páginas
import { Funcionarios } from "./pages/Funcionarios";
import { CadastroFuncionario } from "./pages/Funcionarios/Cadastro";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";

const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Sair"
      statusBarAnimation="fade"
      drawerContentOptions={{
        activeTintColor: "#2196F3",
      }}
      drawerType="slide"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: () => <Feather name="home" size={32} color="#2196F3" />,
        }}
      />
      <Drawer.Screen
        name="Funcionarios"
        component={FuncionarioDrawer}
        options={{
          drawerIcon: () => <Feather name="users" size={32} color="#2196F3" />,
        }}
      />
    </Drawer.Navigator>
  );
}

function FuncionarioDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Sair"
      statusBarAnimation="fade"
      drawerContentOptions={{
        activeTintColor: "#2196F3",
      }}
      drawerType="slide"
    >
      <Drawer.Screen
        name="Funcionarios"
        component={Funcionarios}
        options={{
          drawerIcon: () => <Feather name="users" size={32} color="#2196F3" />,
        }}
      />

      <Drawer.Screen
        name="Cadastrar Funcionario"
        component={CadastroFuncionario}
        options={{
          drawerIcon: () => (
            <Feather name="user-plus" size={32} color="#2196F3" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

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
      >
        <Drawer.Screen
          name="Home"
          component={HomeDrawer}
          options={{
            drawerIcon: () => <Feather name="home" size={32} color="#2196F3" />,
          }}
        />

        <Drawer.Screen
          name="Sair"
          component={SignIn}
          options={{ swipeEnabled: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
