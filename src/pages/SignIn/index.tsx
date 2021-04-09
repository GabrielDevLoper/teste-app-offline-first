import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleGoToDashboard() {
    navigation.navigate("Home");
  }

  return (
    <>
      <View style={styles.containerLogo}>
        <Image source={require("../../assets/sms.png")} />
      </View>

      <View style={styles.containerTitle}>
        <Text style={styles.title}>Acesso ao sistema</Text>
      </View>

      <View style={styles.container}>
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
            placeholderTextColor="#9495a3"
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonEntrar}
            onPress={handleGoToDashboard}
          >
            <Text style={styles.textButtonEntrar}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSair} onPress={() => {}}>
            <Text style={styles.textButtonEntrar}>Sair</Text>
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

  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },

  containerButton: {
    width: 350,
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

  buttonSair: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#f5423c",
    alignItems: "center",
    borderRadius: 10,
  },
  inputArea: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e5ebec",
    paddingBottom: 10,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#e5ebec",
  },
  inputStyle: {
    flex: 1,
    borderRadius: 10,
    fontFamily: "Roboto_500Medium",
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
    fontFamily: "Roboto_500Medium",
  },

  containerTitle: {
    flex: 0.001,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
  },
});
