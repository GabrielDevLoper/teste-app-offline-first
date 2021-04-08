import React, { useState } from "react";
import {
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { Dashboard } from "../../../components/Dashboard";
import { Toast } from "native-base";
import { api } from "../../../services/api";

export function CadastroFuncionario() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");

  async function handleSalvar() {
    const data = {
      nome,
      data_nascimento,
      cpf,
      setor: Number(setor),
    };

    //const response = await api.get("/api/usuarios");

    try {
      setLoading(true);

      await api.post("/api/usuarios", data);

      setLoading(false);

      Toast.show({
        text: "Funcionario cadastrado com sucesso",
        buttonText: "ok",
        position: "top",
        duration: 3000,
        style: {
          marginTop: 59,
          backgroundColor: "#2abb06",
        },
      });

      setNome("");
      setCpf("");
      setDataNascimento("");
      setSetor("");
    } catch {
      setLoading(false);
      Toast.show({
        text: "Erro ao cadastrar um funcionario",
        buttonText: "ok",
        position: "top",
        duration: 3000,
        style: {
          marginTop: 59,
          backgroundColor: "#eb2b2b",
        },
      });
    }
  }

  return (
    <Dashboard>
      {loading ? (
        <ActivityIndicator size={200} color="#2196F3" />
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
            <TextInput
              style={styles.input}
              onChangeText={setSetor}
              value={setor}
              placeholder="Setor"
            />

            <TouchableOpacity
              onPress={handleSalvar}
              style={styles.buttonSalvar}
            >
              <Text style={styles.titleButtonText}>Cadastrar funcionário</Text>
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
