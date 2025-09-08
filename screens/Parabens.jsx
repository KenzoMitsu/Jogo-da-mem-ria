import React from "react";

import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

// import colors from "../design/colors"; // Removido temporariamente para depuração



// Renomeado para Parabens e recebendo { route, navigation }

export default function Parabens({ route, navigation }) {

// Pegando os dados do vencedor que foram passados pela navegação

    const { vencedor } = route.params;



    return (

        <View style={styles.container}>

            <View style={styles.content}>

                <Image style={styles.img} source={require("../assets/logo.png")} />

                <Text style={styles.parabens}>PARABÉNS!</Text>

                <Text style={styles.textonome}>{vencedor.nome.toUpperCase()}</Text>

                <Text style={styles.textonorm}>Você ganhou com {vencedor.pontuacao} pontos!</Text>



                <TouchableOpacity

                    style={styles.btn}

                    // Navega de volta para a tela de jogadores para um novo jogo

                    onPress={() => navigation.replace('Jogadores')}

                >

                    <Text style={styles.textbtn}>

                        JOGAR NOVAMENTE

                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    )

}



const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#e5ead4",

        justifyContent: "center",

        alignItems: "center",

        padding: 20,

    },

    content: {

        width: '100%',

        alignItems: 'center',

    },

    img: {

        width: 150,

        height: 150,

        resizeMode: 'contain',

        marginBottom: 30,

    },

    parabens: {

        fontSize: 32,

        color: "#45936c",

        fontWeight: "bold",

        marginBottom: 20,

    },

    textonorm: {

        fontSize: 20,

        color: "#45936c",

        textAlign: "center",

        fontWeight: "bold",

        marginBottom: 10,

    },

    textonome: {

        fontSize: 28,

        color: "#334f53",

        fontWeight: "bold",

        textAlign: "center",

        marginBottom: 10,

    },

    btn: {

        backgroundColor: "#45936c",

        paddingVertical: 15,

        paddingHorizontal: 30,

        marginTop: 40,

        borderRadius: 10,

    },

    textbtn: {

        fontSize: 18,

        fontWeight: "bold",

        color: "#1f0a1d",

    }

});