import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import colors from "../design/colors";
import Card from "../components/Card";

export default function HomeScreen() {
    const [lista, setLista] = useState([])
    const [novaTarefa, setNovaTarefa] = useState("")
    const [busca, setBusca] = useState("")

    function numTarefasAtivas() {
        let ativas = lista.filter(tarefa => !tarefa.concluido)
        return ativas.length
    }

    return (
        <ScrollView style={styles.container}>
            <Header />
            <FormCadastro fnCadastrar={cadastrarTarefa} texto={novaTarefa} setTexto={setNovaTarefa} />

            <View style={styles.botoes}>
                <BtnCont text={"Tarefas Criadas"} num={numTarefasAtivas()} />
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


            {/*<Card texto={"Estudar para a prova"} />*/}
            {/*<Card texto={"Limpar a casa"} />*/}
            {/*<Card texto={"Lavar a louça"} concluido={true}/>*/}
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