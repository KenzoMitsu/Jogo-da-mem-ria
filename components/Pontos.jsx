import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ScoreBoard({ nome1, pontos1, nome2, pontos2, avatar }) {
    return (
        <View style={styles.root}>
            <View style={styles.scoreBar}>
                <View style={styles.column}>
                    <Text style={styles.playerName}>{nome1}</Text>
                    <Text style={styles.playerScore}>{pontos1}</Text>
                </View>
                <View style={styles.centerColumn}>
                    <Image source={avatar} style={styles.avatar} />
                    <Text style={styles.scoreTitle}>PONTUAÇÃO</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.playerName}>{nome2}</Text>
                    <Text style={styles.playerScore}>{pontos2}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 5,
    },
    avatar: {
        width: 45,
        height: 45,
        marginRight: 6,
        borderRadius: 22,
    },
    scoreBar: {
        flex: 1,
        backgroundColor: "#35926b",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 14,
        minWidth: 220,
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
        alignItems: "center",
    },
    centerColumn: {
        flex: 1,
        alignItems: "center",
    },
    playerName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 2,
    },
    playerScore: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    },
    scoreTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
    },
});