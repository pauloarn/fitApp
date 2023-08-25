import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { RandomTrainingRouter, TrainingRouter } from '../../../types/routes'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ListaVaziaText from '../../../components/ListaVaziaText'
import ExercicioTreino from './ExercicioTreino'
import { ExercicioTreinoExecutado } from '../../../database/model/ExercicioTreinoConfig'
import React, { useEffect, useState } from 'react'
import { Treino } from '../../../database/model/Treino'
import AnotacoesArea from './AnotacoesArea'
import Divider from '../../../components/Divider'
import useExerciseRoutineService from '../../../services/exerciseRoutine/exerciseRoutineService'

interface TreinoDetalheProps {
  route: RouteProp<TrainingRouter>
}
const TreinoDetalhe = ({ route }: TreinoDetalheProps) => {
  const { treinoId: treinoHehe } =
    route.params as TrainingRouter['DetalheTreino']
  const { treinoId } = route.params as RandomTrainingRouter['Visualizar']
  const [isObservacaoAreaOpen, setIsObservacaoAreaOpen] = useState(false)
  const [salvouTreino, setSalvouTreino] = useState(false)
  const [treino, setTreino] = useState<Treino>()
  const [exerciciosTreino, setExerciciosTreino] = useState<
    ExercicioTreinoExecutado[]
  >([])
  const { goBack } = useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const { goBack: goBackRandom } =
    useNavigation<NativeStackNavigationProp<RandomTrainingRouter>>()
  const { getExerciseRoutine } = useExerciseRoutineService()

  useEffect(() => {
    if (treinoId) {
      getExerciseRoutine(treinoId).then((res) => {
        if (res.data?.body) {
          setTreino(treino)
          setExerciciosTreino(
            treino.exercicios.map((ex) => {
              return {
                ...ex,
                executou: false
              }
            })
          )
        }
      })
    }
  }, [treinoId])

  if (!treino) {
    return (
      <View>
        <Text>Carregando</Text>
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

  const handleSalvarTreino = async () => {
    await adicionaTreino(treino)
    setSalvouTreino(true)
  }

  const getListHeight = () => {
    if (isObservacaoAreaOpen) {
      return '74%'
    }
    if (treino.treinoSet?.observacao) {
      return '89%'
    }
    return '94%'
  }

  const marcaExecicio = (exercicio: ExercicioTreinoExecutado) => {
    setExerciciosTreino((prev) =>
      prev.map((ex) => {
        if (ex.id === exercicio.id) {
          return {
            ...ex,
            executou: !ex.executou
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
        <Text style={styles.headerText}>{treino.nome}</Text>
        {treinoId || salvouTreino ? (
          <View style={{ width: widthPercentageToDP('10%') }}></View>
        ) : (
          <TouchableOpacity onPress={handleSalvarTreino}>
            <Text style={styles.textButton}>SALVAR</Text>
          </TouchableOpacity>
        )}
      </View>
      {treino.treinoSet?.observacao && (
        <AnotacoesArea
          isObservacaoAreaOpen={isObservacaoAreaOpen}
          setIsObservacaoAreaOpen={setIsObservacaoAreaOpen}
          observacao={treino.treinoSet.observacao}
        />
      )}
      <SafeAreaView
        style={{
          height: getListHeight(),
          paddingVertical: '1%'
        }}
      >
        <FlatList<ExercicioTreinoExecutado>
          data={exerciciosTreino}
          numColumns={2}
          collapsable={true}
          ItemSeparatorComponent={() => <Divider y={1} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <ListaVaziaText text={'Nenhum exercicio cadastrado neste treino'} />
          }
          style={{ width: '100%', height: '20%' }}
          renderItem={(e) => (
            <ExercicioTreino
              executaExercicio={marcaExecicio}
              key={e.item.id}
              exercicio={e.item}
              treino={treino.treinoSet}
            />
          )}
        />
      </SafeAreaView>
    </View>
  )
}

export default TreinoDetalhe
