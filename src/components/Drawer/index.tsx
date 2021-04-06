import React, { useRef, useState } from "react";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from "react-native";

interface DrawerProps {
  drawer: DrawerLayoutAndroid;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export function Drawer({ drawer, closeDrawer, openDrawer }: DrawerProps) {
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button title="Close drawer" onPress={closeDrawer} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button title="Open drawer" onPress={openDrawer} />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});
