import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Pontos from "../components/Pontos"
import colors from "../design/colors";
import logo from "../assets/logo.png";


export default function TelaJogo() {
    // Substitua pelo caminho correto do seu ícone de macaco
    const monkeyIcon = require("../assets/logo.png"); // Exemplo

    // Gera uma grade 3x3 de cartas (quadrados)
    const cards = Array.from({ length: 9 });

    return (
        <View>
            <Pontos
                nome1="JÚLIA"
                pontos1={20}
                nome2="JOGADOR 2"
                pontos2={9}
                avatar={logo}
            />
        </View>
    );
}
