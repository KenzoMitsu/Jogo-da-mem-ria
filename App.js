import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Inicio from "./screens/Inicio"

import { StyleSheet } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Parabens from "./screens/Parabens";
import Jogo from "./screens/Jogo"

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={"Parabens"} component={Parabens} />
        </Stack.Navigator>
        <Stack.Navigator >
          <Stack.Screen options={{ headerShown: false }}
                        name={"Jogo"}
                        component={Jogo} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
