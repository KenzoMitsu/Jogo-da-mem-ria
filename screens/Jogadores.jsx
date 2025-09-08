import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function Jogadores({ navigation }) {
    const [jogador1, setJogador1] = useState('');
    const [jogador2, setJogador2] = useState('');

    const handleIniciar = () => {
        // Verifica se os nomes não estão vazios antes de iniciar o jogo
        if (jogador1.trim() === '' || jogador2.trim() === '') {
            Alert.alert("Atenção", "Por favor, preencha o nome dos dois jogadores.");
            return;
        }
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
                placeholderTextColor="#334f53"
            />
            <View style={styles.linhaDivisoria} />

            <Text style={styles.label}>Jogador 2:</Text>
            <TextInput
                style={styles.input}
                value={jogador2}
                onChangeText={setJogador2}
                placeholder="Escreva seu nome..."
                placeholderTextColor="#334f53"
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
        backgroundColor: '#eaf0d4',
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
        color: '#1f0a1d',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#334f53",
        fontSize: 18,
        textAlign: 'center',
        color: "#1f0a1d",
        marginBottom: 20,
    },
    linhaDivisoria: {
        width: '70%',
        height: 1,
        backgroundColor: "#334f53",
        marginVertical: 30,
    },
    botaoIniciar: {
        backgroundColor: "#45936c",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 50,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
