import React from "react";
import { Image, View, StyleSheet, useColorScheme } from "react-native";
import { Dashboard } from "../../components/Dashboard";

export function Home() {
  const dark = useColorScheme();
  return (
    <Dashboard>
      <View>
        {dark === "dark" ? (
          <Image
            source={require(`../../assets/sms-branca.png`)}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require(`../../assets/sms.png`)}
            resizeMode="contain"
          />
        )}
      </View>
    </Dashboard>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 200,
  },
});
