import {Text, View, StyleSheet, ScrollView, Alert} from "react-native";
import colors from "../design/colors";
import {getObjects, saveObjects} from "../storage/LocalStorage";

export default function HomeScreen() {
    const [lista, setLista] = useState([])
    const [totalCriado, setTotalCriado] = useState(0)
    const [totalConcluido, setTotalConcluido] = useState(0)
    const [textCadastro, setTextCadastro] = useState("")
    const [textFiltro, setTextFiltro] = useState("")

    useEffect(() => {
        // Recupera as tarefas do AsyncStorage
        async function fetchData() {
            var listaAux = await getObjects("listaTarefas")
            setLista(listaAux ? listaAux : [])
        }

        fetchData()
    }, [])

    useEffect(() => {
        // Total de tarefas concluidas
        var totalConcluidos = lista.filter(function (item) {
            return item.concluido
        })

        var totalNaoConcluidos = lista.filter(function (item) {
            if (item.concluido === true) {
                return false
            }

            return true
        })

        setTotalConcluido(totalConcluidos.length)
        setTotalCriado(totalNaoConcluidos.length)

    }, [lista]);

    async function cadastrarTarefa() {
        var listaAux = [...lista]

        if (textCadastro.trim() === "") {
            Alert.alert("Impossivel cadastrar tarefa vazia.")
            return false;
        }

        var jaExiste = listaAux.find(function (item) {
            if (item.titulo.toLowerCase() === textCadastro.toLowerCase()) {
                return true
            }
            return false
        })

        if (jaExiste) {
            Alert.alert("Essa tarefa já existe.")
            return false;
        }

        listaAux.push({
            titulo: textCadastro,
            concluido: false
        })

        await saveObjects("listaTarefas", listaAux)

        console.log(listaAux)

        setTextCadastro("")
        setLista(listaAux)
    }

    function concluirTarefa(index) {
        var listaAux = [...lista]

        if(listaAux[index].concluido === true) {
            listaAux[index].concluido = false
        } else {
            listaAux[index].concluido = true
        }

        setLista(listaAux)
    }

    function excluirTarefa(index) {
        var listaAux = [...lista]
        listaAux.splice(index, 1)
        setLista(listaAux)
    }

    return (
        <ScrollView>
            <Header />
            <FormCadastro fnCadastrar={cadastrarTarefa}
                          texto={textCadastro}
                          setTexto={setTextCadastro} />

            <View style={styles.containerBotoes}>
                <BtnCont titulo={"Tarefas Criadas"} numero={totalCriado} />
                <BtnCont titulo={"Concluídas"} numero={totalConcluido} isGreen={true} />
            </View>

            <Search texto={textFiltro} setTexto={setTextFiltro} />

            {lista.length === 0 && <EmptyList />}

            {lista
                .sort(function (a, b) {
                    return a.concluido - b.concluido
                })
                .map(function (item, index) {
                    if (item.titulo.toLowerCase().includes(textFiltro.toLowerCase())) {
                        return (
                            <Card key={index}
                                  texto={item.titulo}
                                  ativo={item.concluido}
                                  fnConcluir={() => concluirTarefa(index)}
                                  fnExcluir={() => excluirTarefa(index)}
                            />
                        )
                    }
                })}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: sizes.margin_horizontal,
        marginTop: sizes.padding_large,
        paddingBottom: sizes.padding_large,
        borderBottomWidth: 2,
        borderBottomColor: colors.gray_330
    }
})