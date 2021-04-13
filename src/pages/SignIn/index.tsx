import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  useColorScheme,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";

export function SignIn() {
  const navigation = useNavigation();
  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dark = useColorScheme();

  async function handleLogin() {
    try {
      const { data } = await api.post("sessions", { email, password });
      if (data.token) {
        handleGoToDashboard();
      }

      setEmail("");
      setPassword("");
    } catch {
      Alert.alert("Usuário ou senha incorretas");
    }
  }

  function handleGoToDashboard() {
    navigation.navigate("Home");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          {dark === "dark" ? (
            <Image
              style={styles.img}
              source={require(`../../assets/sms-branca.png`)}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.img}
              source={require(`../../assets/sms.png`)}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Acesso ao sistema</Text>
        </View>
        <View style={styles.inputArea}>
          <Feather name="user" size={32} style={styles.icon} />
          <TextInput
            inlineImageLeft="search"
            style={styles.inputStyle}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#9495a3"
          />
        </View>
        <View style={styles.inputArea}>
          <Feather name="key" size={32} style={styles.icon} />

          <TextInput
            autoCompleteType="password"
            style={styles.inputStyle}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={securePassword}
            textContentType="password"
            placeholderTextColor="#9495a3"
          />

          {password.length != 0 && (
            <TouchableOpacity
              onPress={() => setSecurePassword(!securePassword)}
            >
              <Feather
                name={securePassword ? "eye" : "eye-off"}
                size={32}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
            <Text style={styles.textButtonEntrar}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonCadastrar} onPress={() => {}}>
            <Text style={styles.textButtonCadastrar}>
              Clique aqui e cadastre-se !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d192c",
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
  },

  containerButton: {
    width: 350,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  buttonEntrar: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#2196F3",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonCadastrar: {
    flex: 1,
    paddingTop: 30,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  inputArea: {
    flexDirection: "row",
    width: "95%",
    borderColor: "#e5ebec",
    paddingBottom: 10,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#e5ebec",
  },
  inputStyle: {
    width: 250,
    borderRadius: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "#5c5e70",
  },
  icon: {
    padding: 10,
    color: "#9495a3",
  },

  textButtonEntrar: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
  },

  textButtonCadastrar: {
    color: "black",
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
  },

  containerTitle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  title: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
  },

  img: {
    width: 150,
  },
});
