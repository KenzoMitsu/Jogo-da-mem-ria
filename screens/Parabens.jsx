import React, {useState} from "react";
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from "react-native";
import colors from "../design/colors";

export default function Inicio() {
    const [nome, setnome] = useState([])
    const [novoUser, setNovoUser] = useState("")

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagemsec}>
                <Image style={styles.img} source={require("../assets/logo.png")} />
            </View>
            <Text style={styles.parabens}>PARABÉNS!</Text>
            <Text style={styles.textonome}>JÚLIA{nome}</Text>
            <Text style={styles.textonorm}>Você foi o ganhador (a)!</Text>
            <View>
               <TouchableOpacity style={styles.btn}>
                   <Text style={styles.textbtn}>
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
    imagemsec: {
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        marginTop: 50,
        width: "70%",
        height: "70%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },

    parabens: {
        fontFamily: "Arial",
        fontSize: 30,
        color: colors.verde_base,
        fontWeight: "bold",
        marginTop: 40,
        textAlign: "center",
    },

    textonorm: {
        fontFamily: "Arial",
        fontSize: 20,
        color: colors.verde_base,
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    textonome: {
        fontFamily: "Arial",
        fontSize: 25,
        color: colors.verde_escuro,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    btn: {
        flexDirection: "row",
        backgroundColor: colors.verde_base,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 55,
        marginLeft: 90,
        marginRight: 90,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

    },
    textbtn: {
        fontSize: 17,
        fontFamily: "Arial",
        fontWeight: "bold",
        textAlign: "center",
    }
})