import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dashboard } from "../../../components/Dashboard";
import { useFuncionario } from "../../../hooks/useFuncionario";
import { useSetor } from "../../../hooks/useSetor";
import { useNetStatus } from "../../../hooks/useNetStatus";

export function CadastroFuncionario() {
  const {
    handleSalvar,
    loading,
    sycronizeFuncionarios,
    funcionariosOffline,
  } = useFuncionario();
  const { setores, setoresItermediadores } = useSetor();
  const { net } = useNetStatus();

  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");

  function clearFields() {
    setNome("");
    setCpf("");
    setDataNascimento("");
    setSetor("");
  }

  async function addFuncionario() {
    handleSalvar(nome, data_nascimento, cpf, setor);

    clearFields();
  }

  return (
    <Dashboard>
      {loading ? (
        <ActivityIndicator size={100} color="#51c4d3" />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Cadastro de funcionário</Text>
            </View>
            <View style={styles.containerInputs}>
              <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholderTextColor="#56565f"
                placeholder="Nome"
              />

              <TextInputMask
                type={"custom"}
                options={{
                  mask: "99/99/9999",
                }}
                style={styles.input}
                onChangeText={setDataNascimento}
                value={data_nascimento}
                placeholderTextColor="#56565f"
                placeholder="Data de nascimento"
              />

              <TextInputMask
                type={"cpf"}
                style={styles.input}
                value={cpf}
                placeholderTextColor="#56565f"
                onChangeText={setCpf}
                placeholder="CPF"
              />

              <TouchableOpacity style={styles.input}>
                <Picker
                  selectedValue={setor}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSetor(itemValue)}
                >
                  <Picker.Item
                    color="#56565f"
                    label="Selecione o setor que o funcionario trabalha"
                    value="0"
                  />
                  {net
                    ? setores.map((setores) => (
                        <Picker.Item
                          key={setores.id}
                          label={setores.nome}
                          value={setores.nome}
                        />
                      ))
                    : setoresItermediadores.map((setores) => (
                        <Picker.Item
                          key={setores.id}
                          label={setores.nome}
                          value={setores.nome}
                        />
                      ))}
                </Picker>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addFuncionario}
                style={styles.buttonSalvar}
              >
                <Text style={styles.titleButtonText}>Salvar</Text>
              </TouchableOpacity>
              {net && funcionariosOffline.length != 0 && (
                <TouchableOpacity
                  onPress={sycronizeFuncionarios}
                  style={styles.buttonSalvar}
                >
                  <Text style={styles.titleButtonText}>Sincronizar dados</Text>
                </TouchableOpacity>
              )}
            </View>
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

  containerInputs: {},
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
    color: "white",
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
