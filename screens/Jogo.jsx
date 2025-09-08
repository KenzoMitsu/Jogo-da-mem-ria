import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import React, { useState } from 'react';
import colors from "../design/colors";

export default function TelaJogo() {
    // Substitua pelo caminho correto do seu ícone de macaco
    const monkeyIcon = require("../assets/logo.png"); // Exemplo

    // Gera uma grade 3x3 de cartas (quadrados)
    const cards = Array.from({ length: 9 });

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Image source={monkeyIcon} style={styles.icon} />
                <View style={styles.scoreBar}>
                    <View style={styles.column}>
                        <Text style={styles.playerName}>JÚLIA</Text>
                        <Text style={styles.playerScore}>20</Text>
                    </View>
                    <View style={styles.centerColumn}>
                        <Text style={styles.scoreTitle}>PONTUAÇÃO</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.playerName}>JOGADOR 2</Text>
                        <Text style={styles.playerScore}>9</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardGrid}>
                {cards.map((_, idx) => (
                    <View key={idx} style={styles.card} />
                ))}
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>PARAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eaf0d4",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 30,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginRight: 5,
    },
    scoreBar: {
        backgroundColor: "#35926b",
        borderRadius: 15,
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 35,
        width: 230,
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: -5,
    },
    column: {
        alignItems: "center",
        flex: 1,
    },
    centerColumn: {
        flex: 1,
        alignItems: "center",
    },
    playerName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 2,
    },
    playerScore: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
    },
    scoreTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
    },
    cardGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: 210,
        marginTop: 15,
        marginBottom: 40,
    },
    card: {
        backgroundColor: "#dedede",
        width: 60,
        height: 60,
        borderRadius: 10,
        margin: 8,
    },
    button: {
        marginTop: 8,
        backgroundColor: "#81c784",
        borderRadius: 12,
        width: 120,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#285943",
        fontWeight: "bold",
        fontSize: 18,
        letterSpacing: 1,
    },
});
