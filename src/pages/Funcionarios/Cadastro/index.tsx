import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
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
import { api } from "../../../services/api";

interface DataProps {
  id?: number;
  nome: string;
  cpf: string;
  id_setor: number;
  data_nascimento: string;
  created_at: Date;
  updated_at: Date;
}

interface Setores {
  id?: number;
  nome: string;
  created_at: Date;
  updated_at: Date;
}

export function CadastroFuncionario() {
  const [loading, setLoading] = useState(false);
  const [funcionariosOffline, setFuncionariosOffline] = useState<DataProps[]>(
    []
  );
  const [setores, setSetores] = useState<Setores[]>([]);

  const [funcionariosOnline, setFuncionariosOnline] = useState<DataProps[]>([]);

  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");

  useEffect(() => {
    async function loadSetores() {
      const { data } = await api.get("/api/setores");
      setSetores(data);
    }

    async function loadFuncionariosOnline() {
      setLoading(true);
      const { data } = await api.get("/api/usuarios");

      setFuncionariosOnline(data);

      setLoading(false);
    }

    loadSetores();
    loadFuncionariosOnline();
  }, []);

  //console.log(NetInfo.useNetInfo().isConnected);
  //console.log(funcionariosOnline);
  //console.log(funcionariosOffline);

  const net = false;

  // recebendo todos os cpf dos usuarios que estão inseridos na api;
  const getCpf = funcionariosOnline.map((func) => {
    return func.cpf;
  });

  // verificando se ja existe usuarios na api, antes de sincronizar.
  const matchFuncionarios = funcionariosOffline.map((func) => {
    const funcExiste = [];
    if (getCpf.includes(func.cpf)) {
      funcExiste.push(func);
    }

    return funcExiste;
  });

  console.log(matchFuncionarios);

  async function handleSalvar() {
    const datas = {
      nome,
      data_nascimento,
      cpf,
      id_setor: Number(setor),
    };

    //const response = await api.get("/api/usuarios");
    try {
      setLoading(true);

      if (!net) {
        if (
          nome.length === 0 ||
          data_nascimento.length === 0 ||
          setor.length === 0
        ) {
          Alert.alert("", "Erro ao cadastrar funcionário   ❌", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);

          setLoading(false);

          return;
        }

        const dataOffline = {
          ...datas,
          created_at: new Date(),
          updated_at: new Date(),
        };

        const updateFuncionariosOffline = [...funcionariosOffline];

        updateFuncionariosOffline.push(dataOffline);
        await AsyncStorage.setItem(
          "@storage_Key",
          JSON.stringify(updateFuncionariosOffline)
        );

        setFuncionariosOffline(updateFuncionariosOffline);

        setLoading(false);

        Alert.alert("", "Sucesso ao cadastrar funcionário ✅", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);

        setNome("");
        setCpf("");
        setDataNascimento("");
        setSetor("");

        return;
      }

      const { data } = await api.post<DataProps>("/api/usuarios", datas);
      console.log(data);
      setLoading(false);

      Alert.alert("", "Sucesso ao cadastrar funcionário ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setNome("");
      setCpf("");
      setDataNascimento("");
      setSetor("");
    } catch {
      setLoading(false);

      Alert.alert("", "Erro ao cadastrar funcionário   ❌", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
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
