import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuths } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

export function SignIn() {
  const navigation = useNavigation();
  const { handleLogin, logado, loadingAuth } = useAuths();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  const dark = useColorScheme();

  async function handleSignIn() {
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      {loadingAuth ? (
        <View style={styles.container}>
          <ActivityIndicator size={100} color="#2196F3" />
        </View>
      ) : (
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
            <TouchableOpacity
              style={styles.buttonEntrar}
              onPress={handleSignIn}
            >
              <Text style={styles.textButtonEntrar}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonCadastrar} onPress={() => {}}>
              <Text style={styles.textButtonCadastrar}>
                Clique aqui e crie sua conta !
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    padding: 3,
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
