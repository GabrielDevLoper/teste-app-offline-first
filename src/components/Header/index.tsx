import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface HeaderProps {
  openDrawer: () => void;
}

export function Header({ openDrawer }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Feather name="menu" size={32} style={styles.icon} />
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
