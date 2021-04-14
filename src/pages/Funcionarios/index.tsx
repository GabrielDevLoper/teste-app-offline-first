import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dashboard } from "../../components/Dashboard";

export function Funcionarios() {
  const navigation = useNavigation();
  return (
    <>
      <Dashboard>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastrar Funcionario")}
          style={styles.btnCadastrarFuncionario}
        >
          <Text style={styles.title}>Cadastrar funcionário</Text>
        </TouchableOpacity>
      </Dashboard>
    </>
  );
}

const styles = StyleSheet.create({
  btnCadastrarFuncionario: {
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
