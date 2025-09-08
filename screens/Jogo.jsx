import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";
import Carta from '../components/Carta'; // Criaremos este componente!
// import colors from "../design/colors"; // Removido temporariamente para depuração

// Emojis para as cartas
const EMOJIS = ['🐘', '🐅', '🐒', '🦓', '🦒', '🦁', '🐊', '🦏', ' hippopotamo', '🐆'];

// Função para embaralhar as cartas
const embaralhar = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
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

    // Gera as cartas para o nível atual
    const gerarCartas = () => {
        const numPares = 1 + nivel; // Nível 1 = 2 pares (4 cartas), Nível 2 = 3 pares (6 cartas), etc.
        const emojisParaNivel = EMOJIS.slice(0, numPares);
        const novasCartas = [...emojisParaNivel, ...emojisParaNivel].map((emoji, index) => ({
            id: index,
            emoji: emoji,
        }));
        setCartas(embaralhar(novasCartas));
        setParesEncontrados([]);
        setCartasViradas([]);
    };

    // Inicia o jogo e gera novas cartas quando o nível muda
    useEffect(() => {
        gerarCartas();
    }, [nivel]);

    // Lógica para verificar se as cartas viradas formam um par
    useEffect(() => {
        if (cartasViradas.length < 2) return;

        const primeiraCarta = cartas[cartasViradas[0]];
        const segundaCarta = cartas[cartasViradas[1]];

        if (primeiraCarta.emoji === segundaCarta.emoji) {
            // É um par!
            setParesEncontrados([...paresEncontrados, primeiraCarta.emoji]);
            if (jogadorAtual === 1) {
                setPontuacaoJogador1(pontuacaoJogador1 + 10);
            } else {
                setPontuacaoJogador2(pontuacaoJogador2 + 10);
            }
            setCartasViradas([]); // Limpa para a próxima jogada
        } else {
            // Não é um par
            if (jogadorAtual === 1) {
                setPontuacaoJogador1(Math.max(0, pontuacaoJogador1 - 3));
            } else {
                setPontuacaoJogador2(Math.max(0, pontuacaoJogador2 - 3));
            }
            // Vira as cartas de volta após um tempo
            timeoutRef.current = setTimeout(() => {
                setCartasViradas([]);
                // Muda o jogador apenas se errar
                setJogadorAtual(jogadorAtual === 1 ? 2 : 1);
            }, 1000);
        }

        // Limpa o timeout se o componente for desmontado
        return () => clearTimeout(timeoutRef.current);

    }, [cartasViradas]);

    // Verifica se o jogador encontrou todos os pares para avançar de nível ou terminar o jogo
    useEffect(() => {
        if (cartas.length > 0 && paresEncontrados.length === cartas.length / 2) {
            if (nivel < 4) { // Joga até 10 cartas (5 pares, nível 4)
                Alert.alert("Parabéns!", "Você encontrou todos os pares. Próximo nível!");
                setNivel(nivel + 1);
            } else {
                // Fim de jogo
                const vencedor = pontuacaoJogador1 >= pontuacaoJogador2
                    ? { nome: jogador1, pontuacao: pontuacaoJogador1 }
                    : { nome: jogador2, pontuacao: pontuacaoJogador2 };

                navigation.replace('Parabens', { vencedor });
            }
        }
    }, [paresEncontrados]);


    const virarCarta = (index) => {
        // Impede de virar mais de 2 cartas, ou a mesma carta duas vezes, ou uma carta que já faz parte de um par
        if (cartasViradas.length >= 2 || cartasViradas.includes(index) || paresEncontrados.includes(cartas[index].emoji)) {
            return;
        }
        setCartasViradas([...cartasViradas, index]);
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
                        onPress={() => virarCarta(index)}
                        estaVirada={cartasViradas.includes(index)}
                        parEncontrado={paresEncontrados.includes(item.emoji)}
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