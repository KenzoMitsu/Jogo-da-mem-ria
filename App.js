import React from "react";
import { StyleSheet } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Inicio from "./screens/Inicio";

// Importa todas as suas telas (screens)
import Jogadores from "./screens/Jogadores.jsx";
import Jogo from "./screens/Jogo.jsx";
import Parabens from "./screens/Parabens.jsx";

// Cria o navegador de pilha
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Jogadores">
                <Stack.Screen
                    name="Jogadores"
                    component={Jogadores}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Jogo"
                    component={Jogo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Parabens"
                    component={Parabens}
                    options={{ headerShown: false }}
                />
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name={"Inicio"} component={Inicio} />
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