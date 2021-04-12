import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dashboard } from "../../components/Dashboard";

export function Setores() {
  const navigation = useNavigation();
  return (
    <>
      <Dashboard>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastrar Setor")}
          style={styles.btnCadastrarSetor}
        >
          <Text style={styles.title}>Cadastrar setores</Text>
        </TouchableOpacity>
      </Dashboard>
    </>
  );
}

const styles = StyleSheet.create({
  btnCadastrarSetor: {
    width: 300,
    padding: 20,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    alignItems: "center",
  },

  title: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 20,
  },
});
