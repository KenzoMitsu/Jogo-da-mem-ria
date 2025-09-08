import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";

// A tela de início agora recebe 'navigation' para poder navegar para outras telas.
export default function Inicio({ navigation }) {
    return (
        <ImageBackground
            source={require("../assets/Android Compact - 5.png")}
            style={styles.background}
        >
            <View style={styles.card}>
                <Text style={styles.titulo}>JUNGLE</Text>

                <Image
                    source={require("../assets/logo.png")}
                    style={styles.imagem}
                    resizeMode="contain"
                />

                <Text style={styles.subtitulo}>MEMORY</Text>

                {/* Este botão agora navega para a tela de Jogadores ao ser pressionado */}
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => navigation.navigate('Jogadores')}
                >
                    <Text style={styles.textoBotao}>JOGAR</Text>
                </TouchableOpacity>

                <Text style={styles.textoInfo}>
                    Clique em “Jogar” para começar!
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#3d8361",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        width: "80%",
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#d4edda",
        marginBottom: 10,
    },
    imagem: {
        width: 300,
        height: 150,
        marginVertical: 10,
    },
    subtitulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#d4edda",
        marginBottom: 20,
    },
    botao: {
        backgroundColor: "#a3d977",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    textoBotao: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    textoInfo: {
        marginTop: 10,
        fontSize: 14,
        color: "#fff",
        fontWeight: "500",
        textAlign: "center",
    },
});