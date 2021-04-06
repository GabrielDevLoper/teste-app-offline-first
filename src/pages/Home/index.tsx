import React from "react";
import { useRef } from "react";
import { DrawerLayoutAndroid } from "react-native";
import { Drawer } from "../../components/Drawer";
import { Header } from "../../components/Header";

export function Home() {
  const drawer = useRef(null);

  function handleOpenDrawer() {
    drawer.current?.openDrawer();
  }

  function handleCloseDrawer() {
    drawer.current?.closeDrawer();
  }

  return (
    <>
      <Header openDrawer={handleOpenDrawer} />
      <Drawer
        openDrawer={handleOpenDrawer}
        closeDrawer={handleCloseDrawer}
        drawer={drawer}
      />
    </>
  );
}
