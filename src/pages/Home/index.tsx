import React, { useEffect } from "react";
import { Image, View, StyleSheet, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { Dashboard } from "../../components/Dashboard";
import { useAuths } from "../../hooks/useAuth";

export function Home() {
  const dark = useColorScheme();
  const { nome, handleLogout } = useAuths();

  useEffect(() => {
    Toast.show({
      type: "success",
      text1: "Sucesso ao logar",
      text2: `Seja bem vindo ${nome}`,
      topOffset: 100,
      bottomOffset: 40,
    });
  }, [nome]);

  return (
    <Dashboard>
      <View>
        {/* {dark === "dark" ? (
          <Image
            source={require(`../../assets/sms-branca.png`)}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require(`../../assets/sms.png`)}
            resizeMode="contain"
          />
        )} */}
      </View>
    </Dashboard>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 200,
  },
});
