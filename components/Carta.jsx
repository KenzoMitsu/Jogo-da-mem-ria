import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';



export default function Carta({ item, onPress, estaVirada, parEncontrado }) {
    const deveMostrarEmoji = estaVirada || parEncontrado;

    return (

        <TouchableOpacity

            style={[

                styles.card,

                deveMostrarEmoji ? styles.cardVirada : styles.cardEscondida,

                parEncontrado && styles.cardEncontrada

            ]}

            onPress={onPress}

            activeOpacity={0.7}

        >

            <Text style={styles.emoji}>{deveMostrarEmoji ? item.emoji : '?'}</Text>

        </TouchableOpacity>

    );

}



const styles = StyleSheet.create({

    card: {

        width: 80,

        height: 80,

        borderRadius: 10,

        margin: 8,

        justifyContent: 'center',

        alignItems: 'center',

        borderWidth: 2,

    },

    cardEscondida: {

        backgroundColor: '#81c784',

        borderColor: '#285943',

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

    emoji: {

        fontSize: 40,

    }

});