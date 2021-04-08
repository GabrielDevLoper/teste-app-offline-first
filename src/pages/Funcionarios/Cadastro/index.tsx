import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";
import { Dashboard } from "../../../components/Dashboard";
import { Toast } from "native-base";
import { api } from "../../../services/api";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataProps {
  data: {
    cpf: string;
    nome: string;
    created_at: Date;
    updated_at: Date;
    id: number;
    setor: number;
    data_nascimento: Date;
  };
}

export function CadastroFuncionario() {
  const [loading, setLoading] = useState(false);
  const [funcionariosOffline, setFuncionariosOffline] = useState<DataProps[]>(
    []
  );

  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");

  console.log(NetInfo.useNetInfo().isConnected);
  async function handleSalvar() {
    const datas = {
      nome,
      data_nascimento,
      cpf,
      setor: Number(setor),
      created_at: Date,
      updated_at: Date,
    };

    //const response = await api.get("/api/usuarios");
    console.log(await AsyncStorage.getItem("@storage_Key"));
    try {
      setLoading(true);

      const {
        data: { data: user },
      } = await api.post<DataProps>("/api/usuarios", datas);
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(datas));

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
        <>
          <ActivityIndicator size={150} color="#2196F3" />

          {/*
          <LottieView
            source={require("../../../assets/loader-circles.json")}
            loop
            autoPlay
          />
          */}
        </>
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
