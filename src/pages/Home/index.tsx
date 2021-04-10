import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Dashboard } from "../../components/Dashboard";

export function Home() {
  return (
    <Dashboard>
      <View>
        <Image source={require("../../assets/sms.png")} resizeMode="contain" />
      </View>
    </Dashboard>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    width: 200,
  },
});
