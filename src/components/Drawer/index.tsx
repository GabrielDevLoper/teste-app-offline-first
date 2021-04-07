import React, { useRef, useState } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";

interface DrawerProps {
  drawer: {
    current: DrawerLayoutAndroid;
  };
}

export const Drawer = ({ drawer }: DrawerProps) => {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");

  function ContentDrawer() {
    return (
      <View style={[styles.navigationContainer]}>
        <View style={styles.itemDrawer}>
          <Button
            title="Close drawer"
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
        <View style={styles.itemDrawer}>
          <Button
            title="Close drawer"
            onPress={() => drawer.current?.closeDrawer()}
          />
        </View>
        <View style={styles.itemDrawer}>
          <Button
            title="Close drawer"
            onPress={() => drawer.current?.closeDrawer()}
          />
        </View>
        <View style={styles.itemDrawer}>
          <Button
            title="Close drawer"
            onPress={() => drawer.current?.closeDrawer()}
          />
        </View>
      </View>
    );
  }

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={ContentDrawer}
    >
      <View style={styles.containerLogo}>
        {/*<Image
          source={require("../../assets/logoSms.png")}
          style={styles.logo}
        />
*/}
      </View>
      <View style={styles.container}>
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
            value={dataNascimento}
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
            <Button
              title="Salvar"
              onPress={() => Alert.alert("Simple Button pressed")}
            />
          </View>
        </SafeAreaView>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSalvar: {
    marginTop: 50,
  },
  logo: {
    width: 400,
    height: 200,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
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
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },

  title: {
    margin: 20,
    fontSize: 20,
  },

  itemDrawer: {
    margin: 10,
    backgroundColor: "#ecf0f1",
  },
});
