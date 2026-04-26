import React from "react";
import ListScreen from "@/screens/ListScreen";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "@/routes";


export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};
