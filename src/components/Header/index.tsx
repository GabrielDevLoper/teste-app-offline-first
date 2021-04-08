import React, { useRef } from "react";
import { View, Text, StyleSheet, DrawerLayoutAndroid } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Drawer } from "native-base";

import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";

export function Header() {
  const navigation = useNavigation();

  function handleLogout() {
    navigation.navigate("Sair");
  }

  function handleHome() {
    navigation.navigate("Home");
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={32} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleHome}>
          <Feather name="home" size={32} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Feather name="log-out" size={32} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </>
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

    backgroundColor: "#2196F3",
  },
  icon: {
    padding: 8,
    color: "white",
  },
});
