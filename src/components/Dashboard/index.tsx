import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  DrawerLayoutAndroid,
  Button,
  Text,
} from "react-native";
import { Header } from "../Header";

interface DashboardProps {
  children?: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <View style={styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSalvar: {
    marginTop: 50,
  },
  logo: {
    width: 400,
    height: 200,
  },
  navigationContainer: {},
  input: {
    height: 50,
    width: 300,
    backgroundColor: "#e5ebec",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  paragraph: {
    padding: 16,
    fontSize: 18,
    textAlign: "center",
  },

  title: {
    margin: 20,
    fontSize: 20,
  },
});
