import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import styles from './styles'
import ListaVaziaText from '../../../components/ListaVaziaText'
import FloatingActionButton from '../../../components/FloatingActionButton'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter, TrainingRouter } from '../../../types/routes'
import { useState } from 'react'
import TreinoItems from './TreinoItems'
import { useAppDispatch } from '../../../hooks/useRedux'
import { setTituloTreinoEdit } from '../../../redux/slices/treinoSlice'
import { setIsModalOpen } from '../../../redux/slices/modalSlice'
import useExerciseRoutineService from '../../../services/exerciseRoutine/exerciseRoutineService'
import { ExerciseRoutineItem } from '../../../types/exerciseRoutine'
import Toast from 'react-native-root-toast'

const CreateTraining = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const { addListener, isFocused } =
    useNavigation<NativeStackNavigationProp<RootRouter>>()
  const dispatch = useAppDispatch()
  const [treinos, setTreinos] = useState<ExerciseRoutineItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { getAllRoutines, deleteRoutine } = useExerciseRoutineService()
  addListener('focus', () => {
    if (isFocused()) {
      handleLoadTreinos()
    }
  })

  const handleLoadTreinos = () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    setTreinos([])
    getAllRoutines().then((res) => {
      if (res.data?.body) {
        setTreinos(res.data.body.content)
      }
      setIsLoading(false)
    })
  }
  const handleEditaTreino = (treinoEdit: ExerciseRoutineItem) => {
    dispatch(setTituloTreinoEdit('Editar Treino'))
    setIsModalOpen(false)
    navigate('CreateTraining', { treinoId: treinoEdit.routineId.toString() })
  }

  const handleCriaTreino = () => {
    dispatch(setTituloTreinoEdit('Cadastrar Treino'))
    navigate('CreateTraining', { treinoId: null })
  }
  const handleOpenTreino = (treino: ExerciseRoutineItem) => {
    navigate('DetalheTreino', { treinoId: treino.routineId.toString() })
  }
  const getListEmptyComponent = () => {
    if (isLoading) {
      return <ActivityIndicator size={20} />
    }
    return <ListaVaziaText text={'Nenhum exercício encontrado'} />
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ color: 'white', fontSize: 25 }}>Treinos</Text>
      </View>
      <FlatList<ExerciseRoutineItem>
        data={treinos}
        keyExtractor={(item) => item.routineId.toString()}
        ListEmptyComponent={getListEmptyComponent()}
        ListFooterComponent={
          isLoading && treinos.length > 0 ? (
            <View style={{ paddingVertical: 10 }}>
              <ActivityIndicator size={20} />
            </View>
          ) : undefined
        }
        style={{ width: '100%' }}
        renderItem={(e) => (
          <TreinoItems
            onClickTreino={handleOpenTreino}
            key={e.item.routineId}
            editaTreino={handleEditaTreino}
            treino={e.item}
            excluiTreino={(treino) => {
              deleteRoutine(treino.routineId)
              setTreinos((prev) =>
                prev.filter((t) => t.routineId !== treino.routineId)
              )
              Toast.show('Treino removido com sucesso')
            }}
          />
        )}
      />
      <FloatingActionButton onPress={handleCriaTreino} />
    </View>
  )
}

export default CreateTraining
