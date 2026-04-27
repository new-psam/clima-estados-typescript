import React from "react";
import Routes from "@/routes";
import { Provider } from "react-redux";
import { store } from "@/store";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      
    </Provider>
  );
};
