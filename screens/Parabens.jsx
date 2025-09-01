import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, Image} from "react-native";
import colors from "../design/colors";
import Card from "../components/Card";

export default function Inicio() {
    const [nome, setnome] = useState([])
    const [novoUser, setNovoUser] = useState("")

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <Text>PARABÉNS!</Text>
            <Text>{nome}</Text>
            <Text>Você </Text>
            <View style={styles.botoes}>
                <BtnCont text={"Concluídas"} num={numTarefasConcluidas()} isGreen={true}/>
            </View>
            <Search texto={busca} setTexto={setBusca} />

            {lista.length === 0 && <EmptyList />}

            {lista.sort((a, b) => a.concluido - b.concluido)
                .map((item, index) => {
                    if(item.tarefa.toLowerCase().includes(busca.toLowerCase())) {
                        return (
                            <Card key={index} texto={item.tarefa} concluido={item.concluido}
                                  fnConcluir={() => concluirTarefa(index)} fnExcluir={() => excluirTarefa(index)} />
                        )
                    }
                    return null
                })}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e5ead4",
    },
    botoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray_200,
        paddingBottom: 20
    }
})