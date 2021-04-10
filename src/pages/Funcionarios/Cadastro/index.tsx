import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
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
import { api } from "../../../services/api";

interface Funcionarios {
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
  const [funcionariosOffline, setFuncionariosOffline] = useState<
    Funcionarios[]
  >([]);
  const [setores, setSetores] = useState<Setores[]>([]);

  const [funcionariosOnline, setFuncionariosOnline] = useState<Funcionarios[]>(
    []
  );

  const [nome, setNome] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState(0);

  const net = false;

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

  // console.log(NetInfo.useNetInfo().isConnected);
  // console.log({ online: funcionariosOnline });

  // recebendo todos os cpf dos usuarios que estão inseridos na api;
  const getCpf = funcionariosOnline.map((func) => {
    return func.cpf;
  });

  // verificando se ja existe usuarios na api, antes de sincronizar.
  const matchFuncionarios = funcionariosOffline.map((func) => {
    if (!getCpf.includes(func.cpf)) {
      return func;
    }
  });

  // função elimina todos os objetos undefined e retorna somente
  // os funcionarios que não existe, evitando erro e duplicação
  const removeFuncUndefined = matchFuncionarios.filter((func) => {
    return func != null;
  });

  async function sycronizeFuncionarios() {
    if (removeFuncUndefined) {
      try {
        setLoading(true);
        removeFuncUndefined.map(async (func) => {
          const { data } = await api.post<Funcionarios>("/api/usuarios", func);
        });
        setFuncionariosOffline([]);
        Alert.alert("", "Sincronização realizada com sucesso ✅", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setLoading(false);
      } catch {
        setLoading(false);

        Alert.alert("", "Erro na sincronização", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  }

  async function handleSalvar() {
    // console.log(removeFuncUndefined);
    console.log(funcionariosOffline);
    const datas = {
      nome,
      data_nascimento,
      cpf,
      id_setor: setor,
    };

    //const response = await api.get("/api/usuarios");
    try {
      setLoading(true);

      if (!net) {
        if (nome.length === 0 || data_nascimento.length === 0 || setor === 0) {
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
        setSetor(0);

        return;
      }

      const { data } = await api.post<Funcionarios>("/api/usuarios", datas);
      console.log(data);
      setLoading(false);

      Alert.alert("", "Sucesso ao cadastrar funcionário ✅", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setNome("");
      setCpf("");
      setDataNascimento("");
      setSetor(0);
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
            {/* <TextInput
              style={styles.input}
              onChangeText={setSetor}
              value={setor}
              placeholder="Setor"
            /> */}

            <TouchableOpacity
              onPress={handleSalvar}
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
