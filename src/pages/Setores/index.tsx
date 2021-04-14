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
          <Text style={styles.title}>Cadastrar setor</Text>
        </TouchableOpacity>
      </Dashboard>
    </>
  );
}

const styles = StyleSheet.create({
  btnCadastrarSetor: {
    padding: 20,
    backgroundColor: "#126e82",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
  },
});
