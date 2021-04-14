import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuths } from "../../hooks/useAuth";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { nome, handleLogout, email } = useAuths();
  return (
    <View style={{ flex: 1, backgroundColor: "#d8e3e7" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {email === "gabriel@hotmail.com" && (
                <Avatar.Image
                  source={{
                    uri:
                      "https://avatars.githubusercontent.com/u/46577395?s=400&u=4ba4f3b43f389480f38622b09f49d2d6bb4abd3e&v=4",
                  }}
                  size={60}
                />
              )}

              {email === "vitor@hotmail.com" && (
                <Avatar.Image
                  source={{
                    uri:
                      "https://instagram.fmcz3-1.fna.fbcdn.net/v/t51.2885-15/e35/136666040_167074875168834_5101354979656680277_n.jpg?tp=1&_nc_ht=instagram.fmcz3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=2VZ7JJzdJzMAX-vb-1u&edm=AP_V10EAAAAA&ccb=7-4&oh=83367f6db1023b3fa830bd7b9afa32b6&oe=609D5198&_nc_sid=4f375e",
                  }}
                  size={60}
                />
              )}

              {email === "cleiton@hotmail.com" && (
                <Avatar.Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/36275279?v=4",
                  }}
                  size={60}
                />
              )}

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{nome}</Title>
                <Caption style={styles.caption}>{nome}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              {/* <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View> */}
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Funcionarios"
              icon={({ color, size }) => (
                <Feather name="users" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Funcionarios");
              }}
            />

            <DrawerItem
              label="Setores"
              icon={({ color, size }) => (
                <Feather name="monitor" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate("Setores");
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <Switch />
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => (
            <Feather name="log-out" color={color} size={size} />
          )}
          onPress={handleLogout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,

    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  text: {
    color: "white",
  },
});
