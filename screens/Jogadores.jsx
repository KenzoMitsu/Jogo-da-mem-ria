import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import colors from "../design/colors";

// A função agora recebe "navigation" como um prop
export default function Jogadores({ navigation }) {
    const [jogador1, setJogador1] = useState('');
    const [jogador2, setJogador2] = useState('');

    const handleIniciar = () => {
        // Usa navigation.navigate para ir para a tela "Jogo"
        // e passa os nomes como parâmetros
        navigation.navigate('Jogo', { jogador1, jogador2 });
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.label}>Jogador 1:</Text>
            <TextInput
                style={styles.input}
                value={jogador1}
                onChangeText={setJogador1}
                placeholder="Escreva seu nome..."
                placeholderTextColor={colors.verde_escuro}
            />
            <View style={styles.linhaDivisoria} />

            <Text style={styles.label}>Jogador 2:</Text>
            <TextInput
                style={styles.input}
                value={jogador2}
                onChangeText={setJogador2}
                placeholder="Escreva seu nome..."
                placeholderTextColor={colors.verde_escuro}
            />

            <TouchableOpacity
                style={styles.botaoIniciar}
                onPress={handleIniciar}
            >
                <Text style={styles.textoBotao}>INICIAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.fundo_esverdeado,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.preto_base,
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.verde_escuro,
        fontSize: 18,
        textAlign: 'center',
        color: colors.preto_base,
        marginBottom: 20,
    },
    linhaDivisoria: {
        width: '70%',
        height: 1,
        backgroundColor: colors.verde_escuro,
        marginVertical: 30,
    },
    botaoIniciar: {
        backgroundColor: colors.verde_base,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 50,
    },
    textoBotao: {
        color: colors.preto_base,
        fontSize: 20,
        fontWeight: 'bold',
    },
});