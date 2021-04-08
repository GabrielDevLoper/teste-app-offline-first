import React, { useState } from "react";
import { Button, Text, StyleSheet, View, Image, Alert } from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { Dashboard } from "../../../components/Dashboard";
import { Toast } from "native-base";
import { api } from "../../../services/api";
import AppLoading from "expo-app-loading";

export function CadastroFuncionario() {
  const navigation = useNavigation();

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
      const response = await api.post("/api/usuarios", data);

      if (!response.data) {
        return <AppLoading />;
      }

      Toast.show({
        text: "Funcionario cadastrado com sucesso",
        buttonText: "ok",
      });

      console.log(response);
    } catch {
      Toast.show({
        text: "Erro ao cadastrar um funcionario",
        buttonText: "ok",
      });
    }
  }

  return (
    <>
      <Dashboard>
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
          <View style={styles.buttonSalvar}>
            <Button title="Salvar" onPress={handleSalvar} />
          </View>
        </SafeAreaView>
      </Dashboard>
    </>
  );
}

const styles = StyleSheet.create({
  buttonSalvar: {
    marginTop: 50,
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
  },
});
