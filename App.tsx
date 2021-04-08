import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
import "react-native-gesture-handler";
import { Routes } from "./src/routes";
import AppLoading from "expo-app-loading";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Ubuntu_700Bold,
  // });

  const [isFontAlready, setIsFontAlready] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });

      setIsFontAlready(true);
    }

    loadFonts();
  }, []);

  if (!isFontAlready) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </>
  );
}
