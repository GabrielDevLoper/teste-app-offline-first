import React, { useRef } from "react";
import { Drawer } from "../../components/Drawer";
import { Header } from "../../components/Header";

export function Home() {
  const drawer = useRef(null);
  return (
    <>
      <Header drawer={drawer} />
      <Drawer drawer={drawer} />
    </>
  );
}
