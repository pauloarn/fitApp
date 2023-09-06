import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { RandomTrainingRouter, TrainingRouter } from '../../../types/routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ListaVaziaText from '../../../components/ListaVaziaText'
import ExercicioTreino from './ExercicioTreino'
import React, { useEffect, useState } from 'react'
import AnotacoesArea from './AnotacoesArea'
import Divider from '../../../components/Divider'
import useExerciseRoutineService from '../../../services/exerciseRoutine/exerciseRoutineService'
import {
  ExerciseInRoutineExecution,
  ExerciseRoutineDetailResponse
} from '../../../types/exerciseRoutine'

interface TreinoDetalheProps {
  route: RouteProp<TrainingRouter>
}
const TreinoDetalhe = ({ route }: TreinoDetalheProps) => {
  const { treinoId: treinoHehe } =
    route.params as TrainingRouter['DetalheTreino']
  const { treinoId } = route.params as RandomTrainingRouter['Visualizar']
  const [isObservacaoAreaOpen, setIsObservacaoAreaOpen] = useState(false)
  const [salvouTreino, setSalvouTreino] = useState(false)
  const [treino, setTreino] = useState<ExerciseRoutineDetailResponse>()
  const [exerciciosTreino, setExerciciosTreino] = useState<
    ExerciseInRoutineExecution[]
  >([])
  const { goBack } = useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const { goBack: goBackRandom } =
    useNavigation<NativeStackNavigationProp<RandomTrainingRouter>>()
  const { getExerciseRoutine } = useExerciseRoutineService()

  useEffect(() => {
    if (treinoId) {
      getExerciseRoutine(treinoId).then((res) => {
        if (res.data?.body) {
          setTreino(res.data.body)
          setExerciciosTreino(
            res.data.body.listRoutineExercise.map((ex) => {
              return {
                ...ex,
                hasExecuted: false
              }
            })
          )
        }
      })
    }
  }, [treinoId])

  if (!treino) {
    return (
      <View style={{ ...styles.mainContainer, justifyContent: `center` }}>
        <Text>Carregando Treino</Text>
        <ActivityIndicator size={25} />
      </View>
    )
  }

  const handleGoBack = () => {
    setTreino(undefined)
    if (treinoId) {
      goBack()
      return
    }
    goBackRandom()
  }

  const getListHeight = () => {
    if (isObservacaoAreaOpen) {
      return '74%'
    }
    if (treino.description.length > 0) {
      return '89%'
    }
    return '94%'
  }

  const marcaExecicio = (exercicio: ExerciseInRoutineExecution) => {
    setExerciciosTreino((prev) =>
      prev.map((ex) => {
        if (ex.routineExerciseId === exercicio.routineExerciseId) {
          return {
            ...ex,
            hasExecuted: !ex.hasExecuted
          }
        }
        return ex
      })
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{treino.routineName}</Text>
      </View>
      {treino.description.length > 0 && (
        <AnotacoesArea
          isObservacaoAreaOpen={isObservacaoAreaOpen}
          setIsObservacaoAreaOpen={setIsObservacaoAreaOpen}
          observacao={treino.description}
        />
      )}
      <SafeAreaView
        style={{
          height: getListHeight(),
          paddingVertical: '1%'
        }}
      >
        <FlatList<ExerciseInRoutineExecution>
          data={exerciciosTreino}
          numColumns={2}
          collapsable={true}
          ItemSeparatorComponent={() => <Divider y={1} />}
          keyExtractor={(item) => item.routineExerciseId.toString()}
          ListEmptyComponent={
            <ListaVaziaText text={'Nenhum exercicio cadastrado neste treino'} />
          }
          style={{ width: '100%', height: '20%' }}
          renderItem={(e) => (
            <ExercicioTreino
              executaExercicio={marcaExecicio}
              key={e.item.routineExerciseId}
              exercicio={e.item}
              treino={treino}
            />
          )}
        />
      </SafeAreaView>
    </View>
  )
}

export default TreinoDetalhe
