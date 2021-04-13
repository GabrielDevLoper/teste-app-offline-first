import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useFuncionario } from "../../hooks/useFuncionario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuths } from "../../hooks/useAuth";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  const { handleLogout } = useAuths();
  const { net } = useFuncionario();

  function handleHome() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={32} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHome}>
        <Feather name="home" size={32} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity disabled onPress={handleHome}>
        <Feather
          name={net ? "wifi" : "wifi-off"}
          color={net ? "#76ff03" : "#ff1744"}
          size={32}
          style={styles.iconStatusNet}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Feather name="log-out" size={32} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,

    backgroundColor: "#2196F3",
  },
  icon: {
    padding: 8,
    color: "white",
  },

  iconStatusNet: {
    padding: 8,
    backgroundColor: "#5bb2f8",
    borderRadius: 50,
  },
});
