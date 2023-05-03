import { FlatList, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Text } from 'react-native-paper'
import ListaVaziaText from '../../../components/ListaVaziaText'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TrainingRouter } from '../../../types/routes'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import FloatingActionButtonGroup from '../../../components/FloatingActionButtonGroup'
import { setExerciciosParaTreino } from '../../../redux/slices/treinoSlice'
import ExercicioTreino from './ExercicioTreino'
import treinoService from '../../../database/services/TreinoService'
import TreinoService from '../../../database/services/TreinoService'
import { createUuid } from '../../../helpers/string'
import {
  ExercicioSetup,
  ExercicioTreinoConfig
} from '../../../database/model/ExercicioTreinoConfig'
import { Treino, TreinoSet } from '../../../database/model/Treino'
import Toast from 'react-native-root-toast'
import ModalEditaConfigTreino from './ModalEditaConfigTreino'
import StyledCustomTextInput from '../../../components/StyledCustomTextInput'

interface CreateTrainingProps {
  route: RouteProp<TrainingRouter>
}

const CreateTraining = ({ route }: CreateTrainingProps) => {
  const { navigate, goBack, addListener } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const dispatch = useAppDispatch()
  const { adicionaTreino, editaTreino } = treinoService()
  const [isEditando, setIsEditando] = useState(false)
  const [treinoConfig, setTreinoConfig] = useState<TreinoSet>()
  const [treinoId, setTreinoId] = useState<string>()
  const [isModalEditaTreinoOpen, setIsModalEditaTreinoOpen] = useState(false)
  const { show: toastShow } = Toast
  const title = useAppSelector((state) => state.treinoSlice.tituloAbaTreino)

  const [nomeTreino, setNomeTreino] = useState<string>('')
  const [exerciciosTreino, setExerciciosTreino] = useState<
    ExercicioTreinoConfig[]
  >([])

  const { encontraTreinoPorId } = TreinoService()
  const treinoProps = route.params as TrainingRouter['CreateTraining']

  useEffect(() => {
    if (treinoProps) {
      if (treinoProps.treinoId) {
        encontraTreinoPorId(treinoProps.treinoId).then((treino) => {
          setExerciciosTreino(treino.exercicios)
          setNomeTreino(treino.nome)
          setTreinoConfig(treino.treinoSet)
          setTreinoId(treino.id)
          setIsEditando(true)
        })
      }
      if (treinoProps.exercicios) {
        setExerciciosTreino(
          treinoProps.exercicios.map((ex) => {
            const indexExCadastrado = exerciciosTreino.findIndex(
              (exT) => exT.id === ex.id
            )
            if (indexExCadastrado >= 0) {
              return exerciciosTreino[indexExCadastrado]
            }
            return {
              ...ex,
              criacao: new Date()
            }
          })
        )
      }
    }
  }, [treinoProps])

  addListener('beforeRemove', () => {
    dispatch(setExerciciosParaTreino([]))
  })
  const handleAdicionaExercicios = () => {
    navigate('SelecionaExercicio', {
      vaiSelecionarExercicios: true,
      exerciciosTreino: exerciciosTreino
    })
  }

  const handleSalvaTreino = async () => {
    if (nomeTreino.length < 3) {
      toastShow('Necessário informar um nome para o treino')
      return
    }
    if (exerciciosTreino.length === 0) {
      toastShow('Necessário adicionar pelo menos 1 exercício')
      return
    }
    const treino: Treino = {
      id: createUuid(),
      nome: nomeTreino,
      exercicios: exerciciosTreino,
      treinoSet: treinoConfig
    }
    if (isEditando) {
      await editaTreino(treinoId, treino)
    } else {
      await adicionaTreino(treino)
    }
    dispatch(setExerciciosParaTreino([]))
    navigate('ListTrainings')
  }
  const excluiExercicio = (exercicio: ExercicioTreinoConfig) => {
    setExerciciosTreino((prev) => prev.filter((ex) => ex.id !== exercicio.id))
  }

  const handleEditaExercicio = (
    exercicioId: string,
    exercicio: ExercicioSetup
  ) => {
    setExerciciosTreino((prev) =>
      prev.map((ex) => {
        if (ex.id === exercicioId) {
          return {
            ...ex,
            exercicioSet: {
              carga: exercicio.carga,
              series: exercicio.series,
              repeticoes: exercicio.repeticoes
            }
          }
        }
        return ex
      })
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={() => setIsModalEditaTreinoOpen(true)}>
          <Text style={styles.textButton}>CONFIGURAR</Text>
        </TouchableOpacity>
      </View>
      <StyledCustomTextInput
        placeholder={'Nome do Treino'}
        value={nomeTreino}
        onChangeText={setNomeTreino}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 10,
          textAlign: 'center'
        }}
      >
        Exercicios
      </Text>
      <FlatList<ExercicioTreinoConfig>
        data={exerciciosTreino}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ListaVaziaText
            hpPercentage={'35%'}
            text={'Sem exercicios cadastrados'}
          />
        }
        style={{ width: '100%' }}
        renderItem={(e) => (
          <ExercicioTreino
            key={`${e.index}-${e.item.nomeExercicio}-${e.item.id}`}
            exercicio={e.item}
            handleEditExercicio={handleEditaExercicio}
            excluiExercicio={excluiExercicio}
          />
        )}
      />
      <ModalEditaConfigTreino
        isOpen={isModalEditaTreinoOpen}
        handleClose={() => setIsModalEditaTreinoOpen(false)}
        handleConfirm={setTreinoConfig}
        treinoConfig={treinoConfig}
      />
      <FloatingActionButtonGroup
        mainIconName={'dumbbell'}
        actions={[
          {
            onPress: handleAdicionaExercicios,
            label: 'Adicionar Exercicio',
            iconName: 'plus'
          },
          {
            onPress: handleSalvaTreino,
            label: 'Salvar Treino',
            iconName: 'save'
          }
        ]}
      />
    </View>
  )
}

export default CreateTraining
