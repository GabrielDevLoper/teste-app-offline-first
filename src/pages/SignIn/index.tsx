import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useColorScheme,
  Alert,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  SafeAreaView,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useAuths } from "../../hooks/useAuth";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";

export function SignIn() {
  const { handleLogin, logado, loadingAuth } = useAuths();
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 200, y: 155 }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  const dark = useColorScheme();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        useNativeDriver: true,
        bounciness: 30,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [, loadingAuth]);

  async function handleSignIn() {
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      {loadingAuth ? (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size={100} color="#51c4d3" />
        </SafeAreaView>
      ) : (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.containerLogo}>
            {dark === "dark" ? (
              <Animated.Image
                style={{
                  width: logo.x,
                }}
                source={require(`../../assets/sms-branca.png`)}
                resizeMode="contain"
              />
            ) : (
              <Animated.Image
                style={{
                  width: logo.x,
                }}
                source={require(`../../assets/sms.png`)}
                resizeMode="contain"
              />
            )}
          </View>

          <Animated.View
            style={[
              styles.inputArea,
              {
                opacity: opacity,
                transform: [{ translateY: offset.y }],
              },
            ]}
          >
            <Feather name="user" size={32} style={styles.icon} />
            <TextInput
              inlineImageLeft="search"
              style={styles.inputStyle}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              placeholderTextColor="#9495a3"
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.inputArea,
              {
                opacity: opacity,
                transform: [{ translateY: offset.y }],
              },
            ]}
          >
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
          </Animated.View>
          <Animated.View
            style={[
              styles.containerButton,
              {
                opacity: opacity,
                transform: [{ translateY: offset.y }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonEntrar}
              onPress={handleSignIn}
            >
              <Text style={styles.textButtonEntrar}>Entrar</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.containerButton,
              {
                opacity: opacity,
                transform: [{ translateY: offset.y }],
              },
            ]}
          >
            <TouchableOpacity style={styles.buttonCadastrar} onPress={() => {}}>
              <Text style={styles.textButtonCadastrar}>
                Clique aqui e crie sua conta !
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8e3e7",
  },

  containerInputs: {
    flex: 1,
    justifyContent: "center",
  },

  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
  },

  containerButton: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  buttonEntrar: {
    width: "90%",
    padding: 15,
    margin: 10,
    backgroundColor: "#126e82",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonCadastrar: {
    width: "80%",
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  inputArea: {
    flexDirection: "row",
    width: "90%",
    borderColor: "#e5ebec",
    paddingBottom: 10,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#e5ebec",
  },
  inputStyle: {
    width: "75%",
    borderRadius: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "#5c5e70",
  },
  icon: {
    padding: 3,
    color: "#126e82",
  },

  textButtonEntrar: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
  },

  textButtonCadastrar: {
    color: "#126e82",
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
  },

  img: {
    width: 170,
  },
});
