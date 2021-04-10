import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dashboard } from "../../../components/Dashboard";
import { useFuncionario } from "../../../hooks/useFuncionario";

export function CadastroFuncionario() {
  const {
    handleSalvar,
    loading,
    sycronizeFuncionarios,
    setores,
    net,
    funcionariosOffline,
  } = useFuncionario();
  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState(0);

  // console.log(NetInfo.useNetInfo().isConnected);
  // console.log({ online: funcionariosOnline });

  function clearFields() {
    setNome("");
    setCpf("");
    setDataNascimento("");
    setSetor(0);
  }

  async function addFuncionario() {
    handleSalvar(nome, data_nascimento, cpf, setor);
    clearFields();
  }

  return (
    <Dashboard>
      {loading ? (
        <ActivityIndicator size={150} color="#2196F3" />
      ) : (
        <>
          <Text style={styles.title}>Cadastro de funcionário</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
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
              placeholder="Data de nascimento"
            />

            <TextInputMask
              type={"cpf"}
              style={styles.input}
              value={cpf}
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
                  color="#8c8d8f"
                  label="Selecione o setor"
                  value="0"
                />
                {setores.map((setores) => (
                  <Picker.Item
                    key={setores.id}
                    label={setores.nome}
                    value={setores.id}
                  />
                ))}
              </Picker>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={addFuncionario}
              style={styles.buttonSalvar}
            >
              <Text style={styles.titleButtonText}>Cadastrar funcionário</Text>
            </TouchableOpacity>
            {net && funcionariosOffline.length != 0 && (
              <TouchableOpacity
                onPress={sycronizeFuncionarios}
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
