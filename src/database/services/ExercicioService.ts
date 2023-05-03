import AsyncStorage from '@react-native-async-storage/async-storage'
import { Exercicio } from '../model/Exercicio'

const ExercicioService = () => {
  const exercicioStorageKey = '@fitApp_ExercicioList'
  const instanciateExercicios = async () => {
    await AsyncStorage.setItem(exercicioStorageKey, JSON.stringify([]))
  }
  const getExercicios = async (): Promise<Exercicio[]> => {
    let ex
    try {
      ex = await AsyncStorage.getItem(exercicioStorageKey)
    } catch (e) {
      await instanciateExercicios()
      ex = await AsyncStorage.getItem(exercicioStorageKey)
    }
    return ex ? (JSON.parse(ex) as Exercicio[]) : []
  }

  const getExerciciosOrdenadoPorNome = async () => {
    const exs = await getExercicios()
    return exs.sort((a, b) => {
      const nameA = a.nomeExercicio.toUpperCase()
      const nameB = b.nomeExercicio.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  }

  const encontraExercicioPorId = async (id: string) => {
    const exs = await getExercicios()
    return exs.filter((ex) => ex.id === id)
  }

  const adicionaVariosExercicios = async (exercicios: Exercicio[]) => {
    const exs = await getExercicios()
    exercicios.forEach((ex) => {
      if (exs.findIndex((e) => e.id === ex.id) === -1) {
        exs.push(ex)
      }
    })
    await AsyncStorage.setItem(exercicioStorageKey, JSON.stringify(exs))
  }

  const adicionaExercicio = async (novoEx: Exercicio) => {
    const exs = await getExercicios()
    exs.push(novoEx)
    await AsyncStorage.setItem(exercicioStorageKey, JSON.stringify(exs))
  }

  return {
    getExercicios,
    adicionaVariosExercicios,
    getExerciciosOrdenadoPorNome,
    adicionaExercicio,
    instanciateExercicios,
    encontraExercicioPorId
  }
}

export default ExercicioService
