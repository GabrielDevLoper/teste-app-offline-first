import React from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Dashboard } from "../../../components/Dashboard";
import { useSetor } from "../../../hooks/useSetor";
import { useNetStatus } from "../../../hooks/useNetStatus";
import Toast from "react-native-toast-message";

export function CadastroSetor() {
  const {
    nome,
    setNome,
    handleSalvar,
    loading,
    sycronizeSetores,
    setoresOffline,
  } = useSetor();
  const { net } = useNetStatus();

  async function addSetor() {
    if (nome.length === 0) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha todos os campos",
        topOffset: 100,
        bottomOffset: 40,
      });
      return;
    }
    handleSalvar();
  }

  return (
    <Dashboard>
      {loading ? (
        <ActivityIndicator size={100} color="#51c4d3" />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Cadastro de setor</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
              placeholder="Nome"
              placeholderTextColor="#56565f"
            />

            <TouchableOpacity onPress={addSetor} style={styles.buttonSalvar}>
              <Text style={styles.titleButtonText}>Salvar</Text>
            </TouchableOpacity>
            {net && setoresOffline.length != 0 && (
              <TouchableOpacity
                onPress={sycronizeSetores}
                style={styles.buttonSalvar}
              >
                <Text style={styles.titleButtonText}>Sincronizar dados</Text>
              </TouchableOpacity>
            )}
          </SafeAreaView>
        </>
      )}
    </Dashboard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202024",
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  containerTitle: {
    marginBottom: 20,
  },
  buttonSalvar: {
    width: 300,
    padding: 2,
    marginTop: 50,
    backgroundColor: "#126e82",
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },

  input: {
    height: 50,
    width: 300,
    backgroundColor: "#121214",
    fontFamily: "Roboto_500Medium",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: "white",
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
    color: "white",
    fontFamily: "Roboto_500Medium",
  },

  titleButtonText: {
    margin: 20,
    fontSize: 20,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});
