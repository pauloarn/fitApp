import { FlatList, View } from 'react-native'
import ExerciseCard from './ExerciseCard'
import styles from './styles'
import { useEffect, useState } from 'react'
import { ExerciciosComIdInterface } from '../../types/exercises'
import SearchArea, { SearchFilterForm } from './SearchArea'
import ExercicioService from '../../database/services/ExercicioService'
import { Exercicio } from '../../database/model/Exercicio'
import ListaVaziaText from '../../components/ListaVaziaText'
import FloatingActionButton from '../../components/FloatingActionButton'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TrainingRouter } from '../../types/routes'

interface ListExercisesProps {
  route: RouteProp<TrainingRouter>
}
const ListExercises = ({ route }: ListExercisesProps) => {
  const { getExerciciosOrdenadoPorNome } = ExercicioService()
  const [listaExercicios, setListaExercicios] = useState<Exercicio[]>([])
  const [listaView, setListaView] = useState<ExerciciosComIdInterface[]>([])
  const [isSelecionandoExercicios, setIsSelecionandoExercicios] =
    useState(false)
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<
    Exercicio[]
  >([])
  const [pageCount, setPageCount] = useState(1)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()

  const exerciciosProps = route.params as TrainingRouter['SelecionaExercicio']

  useEffect(() => {
    if (exerciciosProps) {
      setIsSelecionandoExercicios(exerciciosProps.vaiSelecionarExercicios)
      setExerciciosSelecionados(exerciciosProps.exerciciosTreino)
    }
  }, [exerciciosProps])

  useEffect(() => {
    const instanciateExercicios = async () => {
      const ex = await getExerciciosOrdenadoPorNome()
      setListaExercicios(ex)
    }
    instanciateExercicios().catch(console.log)
  }, [])

  useEffect(() => {
    setListaView(listaExercicios.slice(0, 10))
  }, [listaExercicios])
  const loadMoreItems = () => {
    setListaView((prev) => [
      ...prev,
      ...listaExercicios.slice(10 * pageCount + 1, (pageCount + 1) * 10)
    ])
    setPageCount((prev) => prev + 1)
  }
  const handleSearch = (searchForm: SearchFilterForm) => {
    setListaView([])
    const auxList = listaExercicios.filter((ex) => {
      const incluso: Boolean[] = []
      if (searchForm.muscleName.length > 0) {
        incluso.push(ex.nomeExercicio.includes(searchForm.muscleName))
        incluso.push(ex.exerciseName.includes(searchForm.muscleName))
      }
      if (searchForm.tipoTreino) {
        incluso.push(ex.exerciseType === searchForm.tipoTreino.value)
      }
      if (searchForm.muscleGroup) {
        incluso.push(ex.bodyPart === searchForm.muscleGroup.value)
      }
      if (searchForm.tipoEquipamento) {
        incluso.push(ex.equipmentType === searchForm.tipoEquipamento.value)
      }
      return incluso.every(Boolean)
    })
    setListaView(auxList)
  }

  const handleClickCard = (exercicioSelecionado: Exercicio) => {
    if (isSelecionandoExercicios) {
      if (
        exerciciosSelecionados.filter((ex) => ex.id === exercicioSelecionado.id)
          .length > 0
      ) {
        setExerciciosSelecionados((prev) =>
          prev.filter((ex) => ex.id !== exercicioSelecionado.id)
        )
      } else {
        setExerciciosSelecionados((prev) => [...prev, exercicioSelecionado])
      }
    }
  }

  const handleConfirmExerciciosParaTreino = () => {
    navigate('CreateTraining', {
      exercicios: exerciciosSelecionados,
      treinoId: null
    })
  }

  return (
    <View style={styles.mainContainer}>
      <SearchArea handleSearch={handleSearch} />
      <FlatList<ExerciciosComIdInterface>
        data={listaView}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ListaVaziaText text={'Nenhum exercício encontrado'} />
        }
        style={{ width: '100%' }}
        onEndReached={loadMoreItems}
        renderItem={(e) => (
          <ExerciseCard
            exercise={e.item}
            onPress={handleClickCard}
            listaExercicios={exerciciosSelecionados}
          />
        )}
      />
      {isSelecionandoExercicios && exerciciosSelecionados.length > 0 && (
        <FloatingActionButton
          onPress={handleConfirmExerciciosParaTreino}
          iconName={'check'}
        />
      )}
    </View>
  )
}
export default ListExercises
