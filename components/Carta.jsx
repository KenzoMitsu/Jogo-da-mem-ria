import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Carta({ item, verso, onPress, estaVirada, parEncontrado }) {
    const deveMostrarImagem = estaVirada || parEncontrado;

    return (
        <TouchableOpacity
            style={[
                styles.card,
                deveMostrarImagem ? styles.cardVirada : styles.cardEscondida,
                parEncontrado && styles.cardEncontrada,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {deveMostrarImagem ? (
                <Image source={item.imagem} style={styles.imagem} resizeMode="contain" />
            ) : (
                <Image source={verso} style={styles.imagem} resizeMode="contain" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 70,            // menor largura
        height: 70,           // menor altura
        borderRadius: 8,      // arredondado suave
        margin: 5,            // menos espaçamento entre cartas
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,       // borda mais fina
        borderColor: '#285943', // mantenha a cor desejada
    },
    cardEscondida: {
        backgroundColor: '#81c784',
    },
    cardVirada: {
        backgroundColor: '#ffffff',
        borderColor: '#35926b',
    },
    cardEncontrada: {
        backgroundColor: '#a5d6a7',
        borderColor: '#35926b',
        opacity: 0.7,
    },
    imagem: {
        width: 100,            // diminua imagem para ajustar na carta menor
        height: 100,
    },
});
