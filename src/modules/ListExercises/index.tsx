import { ActivityIndicator, FlatList, View } from 'react-native'
import ExerciseCard from './ExerciseCard'
import styles from './styles'
import { useEffect, useState } from 'react'
import { ListedExercise } from '../../types/exercises'
import SearchArea, { SearchFilterForm } from './SearchArea'
import ListaVaziaText from '../../components/ListaVaziaText'
import FloatingActionButton from '../../components/FloatingActionButton'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TrainingRouter } from '../../types/routes'
import useExercisesList from './useExercisesList'

interface ListExercisesProps {
  route: RouteProp<TrainingRouter>
}
const ListExercises = ({ route }: ListExercisesProps) => {
  const [searchFilter, setSearchFilter] = useState<SearchFilterForm>({
    muscleName: '',
    muscleGroup: null,
    tipoTreino: null,
    tipoEquipamento: null
  })
  const {
    exercisesList,
    isLoading,
    handleClickCard,
    handleLoadMoreItems,
    exerciciosSelecionados,
    setExerciciosSelecionados
  } = useExercisesList(searchFilter)

  const [isSelecionandoExercicios, setIsSelecionandoExercicios] =
    useState(false)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()

  const exerciciosProps = route.params as TrainingRouter['SelecionaExercicio']

  useEffect(() => {
    if (exerciciosProps) {
      setIsSelecionandoExercicios(exerciciosProps.vaiSelecionarExercicios)
      setExerciciosSelecionados(exerciciosProps.exerciciosTreino)
    }
  }, [exerciciosProps])
  const loadMoreItems = () => {
    handleLoadMoreItems()
  }

  const handleConfirmExerciciosParaTreino = () => {
    navigate('CreateTraining', {
      exercicios: exerciciosSelecionados,
      treinoId: null
    })
  }

  const getListEmptyComponent = () => {
    if (isLoading) {
      return <ActivityIndicator size={20} />
    }
    return <ListaVaziaText text={'Nenhum exercício encontrado'} />
  }

  return (
    <View style={styles.mainContainer}>
      <SearchArea handleSearch={setSearchFilter} />
      <FlatList<ListedExercise>
        data={exercisesList}
        keyExtractor={(item) => item.exerciseId.toString()}
        ListEmptyComponent={getListEmptyComponent()}
        style={{ width: '100%' }}
        ListFooterComponent={
          isLoading && exercisesList.length > 0 ? (
            <View style={{ paddingVertical: 10 }}>
              <ActivityIndicator size={20} />
            </View>
          ) : undefined
        }
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
