import * as React from "react";
import { Root } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Funcionarios } from "./pages/Funcionarios";
import { CadastroFuncionario } from "./pages/Funcionarios/Cadastro";
import { Feather } from "@expo/vector-icons";

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

export function Routes() {
  return (
    <NavigationContainer>
      <Root>
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
              drawerIcon: () => (
                <Feather name="home" size={32} color="#2196F3" />
              ),
            }}
          />

          <Drawer.Screen
            name="Sair"
            component={SignIn}
            options={{ swipeEnabled: false }}
          />
        </Drawer.Navigator>
      </Root>
    </NavigationContainer>
  );
}
