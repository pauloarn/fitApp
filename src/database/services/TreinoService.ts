import AsyncStorage from '@react-native-async-storage/async-storage'
import { Treino } from '../model/Treino'

const TreinoService = () => {
  const treinoStorageKey = '@fitApp_TreinoList'
  const instanciateTreino = async () => {
    await AsyncStorage.setItem(treinoStorageKey, JSON.stringify([]))
  }
  const getTreinos = async (): Promise<Treino[]> => {
    let tr
    try {
      tr = await AsyncStorage.getItem(treinoStorageKey)
    } catch (ex) {
      await instanciateTreino()
      tr = await AsyncStorage.getItem(treinoStorageKey)
    }
    return tr ? (JSON.parse(tr) as Treino[]) : []
  }

  const encontraTreinoPorId = async (id: string) => {
    const exs = await getTreinos()
    return exs.filter((ex) => ex.id === id)[0]
  }

  const removeTreino = async (treino: Treino) => {
    const treinos = await getTreinos()
    const treinosFiltrados = treinos.filter((tr) => tr.id !== treino.id)
    await AsyncStorage.setItem(
      treinoStorageKey,
      JSON.stringify(treinosFiltrados)
    )
  }
  const adicionaTreino = async (novoEx: Treino) => {
    const exs = await getTreinos()
    exs.push(novoEx)
    await AsyncStorage.setItem(treinoStorageKey, JSON.stringify(exs))
  }

  const editaTreino = async (treinoId: string, treino: Treino) => {
    const treinos = await getTreinos()
    const treinoSendoEditado = treinos.findIndex(
      (treino) => treino.id === treinoId
    )
    if (treinoSendoEditado >= 0) {
      treinos[treinoSendoEditado].nome = treino.nome
      treinos[treinoSendoEditado].exercicios = treino.exercicios
      treinos[treinoSendoEditado].treinoSet = treino.treinoSet
      await AsyncStorage.setItem(treinoStorageKey, JSON.stringify(treinos))
    } else {
      await adicionaTreino(treino)
    }
  }

  return {
    editaTreino,
    adicionaTreino,
    getTreinos,
    removeTreino,
    encontraTreinoPorId,
    instanciateTreino
  }
}
export default TreinoService
