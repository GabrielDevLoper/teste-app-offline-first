import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dashboard } from "../../components/Dashboard";
import { DataTable } from "react-native-paper";

export function Funcionarios() {
  const navigation = useNavigation();
  return (
    <>
      <Dashboard>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={1}
            numberOfPages={4}
            onPageChange={(page) => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
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
    width: 300,
    padding: 20,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    alignItems: "center",
  },

  title: {
    color: "white",
    fontFamily: "Roboto_medium",
    fontSize: 20,
  },
});
