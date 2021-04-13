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
  const { nome, handleLogout } = useAuths();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    "https://jvmnegociosimobiliarios.com.br/assets/img/avatar/default.png",
                }}
                size={60}
              />

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
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
