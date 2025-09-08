import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";
import Carta from '../components/Carta';

// Array com as 25 imagens disponíveis
const CARTAS = [
    require("../assets/1.png"),
    require("../assets/2.png"),
    require("../assets/3.png"),
    require("../assets/4.png"),
    require("../assets/5.png"),
    require("../assets/6.png"),
    require("../assets/7.png"),
    require("../assets/8.png"),
    require("../assets/9.png"),
    require("../assets/10.png"),
    require("../assets/11.png"),
    require("../assets/12.png"),
    require("../assets/13.png"),
    require("../assets/14.png"),
    require("../assets/15.png"),
    require("../assets/16.png"),
    require("../assets/17.png"),
    require("../assets/18.png"),
    require("../assets/19.png"),
    require("../assets/20.png"),
    require("../assets/21.png"),
    require("../assets/22.png"),
    require("../assets/23.png"),
    require("../assets/24.png"),
    require("../assets/25.png"),
];

const VERSO_CARTA = require("../assets/26.png");

// Função para embaralhar arrays
const embaralhar = (array) => {
    let novoArray = array.slice();
    let currentIndex = novoArray.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [novoArray[currentIndex], novoArray[randomIndex]] = [novoArray[randomIndex], novoArray[currentIndex]];
    }
    return novoArray;
};

// Função para escolher N itens aleatórios de um array, sem repetir
const escolherRandomicamente = (array, n) => {
    const arrayEmbaralhado = embaralhar(array);
    return arrayEmbaralhado.slice(0, n);
};

export default function Jogo({ route, navigation }) {
    const { jogador1, jogador2 } = route.params;

    const [nivel, setNivel] = useState(1);
    const [cartas, setCartas] = useState([]);
    const [cartasViradas, setCartasViradas] = useState([]);
    const [paresEncontrados, setParesEncontrados] = useState([]);

    const [pontuacaoJogador1, setPontuacaoJogador1] = useState(0);
    const [pontuacaoJogador2, setPontuacaoJogador2] = useState(0);
    const [jogadorAtual, setJogadorAtual] = useState(1);

    const timeoutRef = useRef(null);

    // Gera as cartas para o nível atual com pares aleatórios
    const gerarCartas = () => {
        const numPares = 1 + nivel; // par progressivo por nível

        // Seleciona N imagens aleatórias para o nível atual
        const imagensParaNivel = escolherRandomicamente(CARTAS, numPares);

        // Cria pares e atribui ids únicos
        let novasCartas = [];
        imagensParaNivel.forEach((imagem, idx) => {
            novasCartas.push({ id: idx * 2, imagem });
            novasCartas.push({ id: idx * 2 + 1, imagem });
        });

        novasCartas = embaralhar(novasCartas);

        setCartas(novasCartas);
        setParesEncontrados([]);
        setCartasViradas([]);
    };

    useEffect(() => {
        gerarCartas();
    }, [nivel]);

    useEffect(() => {
        if (cartasViradas.length < 2) return;

        const primeiraCarta = cartas[cartasViradas[0]];
        const segundaCarta = cartas[cartasViradas[1]];

        if (primeiraCarta.imagem === segundaCarta.imagem) {
            setParesEncontrados(prev => [...prev, primeiraCarta.id, segundaCarta.id]);
            setCartasViradas([]);

            setPontuacaoJogador1(prev => {
                if (jogadorAtual === 1) return prev + 10;
                return prev;
            });
            setPontuacaoJogador2(prev => {
                if (jogadorAtual === 2) return prev + 10;
                return prev;
            });
        }
        else {
            setPontuacaoJogador1(prev => {
                if (jogadorAtual === 1) return Math.max(0, prev - 3);
                return prev;
            });
            setPontuacaoJogador2(prev => {
                if (jogadorAtual === 2) return Math.max(0, prev - 3);
                return prev;
            });

            timeoutRef.current = setTimeout(() => {
                setCartasViradas([]);
                setJogadorAtual(prev => (prev === 1 ? 2 : 1));
            }, 1000);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [cartasViradas]);

    useEffect(() => {
        if (cartas.length > 0 && paresEncontrados.length === cartas.length) {
            if (nivel < 4) {
                Alert.alert(
                    "Parabéns!",
                    "Você encontrou todos os pares. Próximo nível!",
                    [{ text: "OK", onPress: () => setNivel(prev => prev + 1) }],
                    { cancelable: false }
                );
            } else {
                const vencedor = pontuacaoJogador1 >= pontuacaoJogador2
                    ? { nome: jogador1, pontuacao: pontuacaoJogador1 }
                    : { nome: jogador2, pontuacao: pontuacaoJogador2 };
                navigation.replace('Parabens', { vencedor });
            }
        }
    }, [paresEncontrados]);

    const virarCarta = (index) => {
        if (
            cartasViradas.length >= 2 ||
            cartasViradas.includes(index) ||
            paresEncontrados.includes(cartas[index].id)
        ) {
            return;
        }
        setCartasViradas(prev => [...prev, index]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Image source={require("../assets/logo.png")} style={styles.icon} />
                <View style={styles.scoreBar}>
                    <View style={[styles.column, jogadorAtual === 1 && styles.jogadorAtivo]}>
                        <Text style={styles.playerName}>{jogador1.toUpperCase()}</Text>
                        <Text style={styles.playerScore}>{pontuacaoJogador1}</Text>
                    </View>
                    <View style={styles.centerColumn}>
                        <Text style={styles.scoreTitle}>NÍVEL {nivel}</Text>
                    </View>
                    <View style={[styles.column, jogadorAtual === 2 && styles.jogadorAtivo]}>
                        <Text style={styles.playerName}>{jogador2.toUpperCase()}</Text>
                        <Text style={styles.playerScore}>{pontuacaoJogador2}</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={cartas}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.cardGrid}
                renderItem={({ item, index }) => (
                    <Carta
                        item={item}
                        verso={VERSO_CARTA}
                        onPress={() => virarCarta(index)}
                        estaVirada={cartasViradas.includes(index)}
                        parEncontrado={paresEncontrados.includes(item.id)}
                    />
                )}
            />

            <Text style={styles.vezDoJogador}>
                Vez de: {jogadorAtual === 1 ? jogador1 : jogador2}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eaf0d4",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
        paddingHorizontal: 10,
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
    },
    scoreBar: {
        backgroundColor: "#35926b",
        borderRadius: 15,
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: '85%',
        alignItems: "center",
        justifyContent: "space-between",
    },
    column: {
        alignItems: "center",
        flex: 1,
        padding: 5,
        borderRadius: 10,
    },
    centerColumn: {
        flex: 1,
        alignItems: "center",
    },
    jogadorAtivo: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    playerName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
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
    },
    cardGrid: {
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 20,
    },
    vezDoJogador: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#334f53',
        marginTop: 20,
    }
});
