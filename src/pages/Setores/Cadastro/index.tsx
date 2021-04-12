import React from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Dashboard } from "../../../components/Dashboard";
import { useSetor } from "../../../hooks/useSetor";

export function CadastroSetor() {
  const { nome, setNome, handleSalvar, loading } = useSetor();

  async function addSetor() {
    handleSalvar();
  }

  return (
    <Dashboard>
      {loading ? (
        <ActivityIndicator size={100} color="#2196F3" />
      ) : (
        <>
          <Text style={styles.title}>Cadastro de setor</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Nome"
            />

            <TouchableOpacity onPress={addSetor} style={styles.buttonSalvar}>
              <Text style={styles.titleButtonText}>Salvar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </Dashboard>
  );
}

const styles = StyleSheet.create({
  buttonSalvar: {
    width: 300,
    padding: 2,
    marginTop: 50,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    alignItems: "center",
  },

  input: {
    height: 50,
    width: 300,
    backgroundColor: "#e5ebec",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  picker: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 24,
    marginBottom: 8,
  },

  title: {
    margin: 20,
    fontSize: 20,
    color: "black",
  },

  titleButtonText: {
    margin: 20,
    fontSize: 20,
    color: "white",
  },
});
