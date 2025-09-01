import React, {useState} from "react";
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from "react-native";
import colors from "../design/colors";

export default function Inicio() {
    const [nome, setnome] = useState([])
    const [novoUser, setNovoUser] = useState("")

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.img} source={require("../assets/logo.png")} />
            <Text style={styles.textonorm}>PARABÉNS!</Text>
            <Text style={styles.textonome}>JÚLIA{nome}</Text>
            <Text style={styles.textonorm}>Você foi o ganhador (a)!</Text>
            <View>
               <TouchableOpacity style={styles.btn}>
                   <Text>
                       JOGAR NOVAMENTE
                   </Text>
               </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e5ead4",
    },
    img: {
        marginTop: 50,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
    textonorm: {
        fontFamily: "Arial",
        fontSize: 20,
        color: colors.verde_base,
    },
    textonome: {
        fontFamily: "Arial",
        fontSize: 20,
        color: colors.verde_escuro,
    },
    btn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.verde_escuro,
        paddingBottom: 20,
        color: "black",
    }
})