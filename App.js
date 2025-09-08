import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "./screens/Inicio.jsx";
import Jogadores from "./screens/Jogadores.jsx";
import Jogo from "./screens/Jogo.jsx";
import Parabens from "./screens/Parabens.jsx";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Inicio"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Jogadores" component={Jogadores} />
                <Stack.Screen name="Jogo" component={Jogo} />
                <Stack.Screen name="Parabens" component={Parabens} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});