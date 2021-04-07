import React, { useRef } from "react";
import { DrawerLayoutAndroid } from "react-native";
import { Drawer } from "../../components/Drawer";
import { Header } from "../../components/Header";

interface DrawerProps {
  drawer: {
    current: DrawerLayoutAndroid;
  };
}

export function Home() {
  const drawer = useRef<DrawerProps>(null);
  return (
    <>
      <Header
        // @ts-expect-error
        drawer={drawer}
      />

      <Drawer
        // @ts-expect-error
        drawer={drawer}
      />
    </>
  );
}
