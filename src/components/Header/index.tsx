import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HeaderProps {
  drawer: typeof useRef;
}

export function Header({ drawer }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
        <Feather name="menu" size={32} style={styles.icon} />
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
    paddingLeft: 16,
    backgroundColor: "#2196F3",
  },
  icon: {
    padding: 8,
    color: "white",
  },
});
