import React from "react";
import { Text, Image, View } from "react-native";
import { Dashboard } from "../../components/Dashboard";
import LottieView from "lottie-react-native";

export function Home() {
  return (
    <Dashboard>
      <View>
        <Image source={require("../../assets/sms.png")} />
      </View>
    </Dashboard>
  );
}
