import { FlatList, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Text } from 'react-native-paper'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TrainingRouter } from '../../../types/routes'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { setExerciciosParaTreino } from '../../../redux/slices/treinoSlice'
import { ExercicioSetup } from '../../../database/model/ExercicioTreinoConfig'
import { TreinoSet } from '../../../database/model/Treino'
import Toast from 'react-native-root-toast'
import useExerciseRoutineService from '../../../services/exerciseRoutine/exerciseRoutineService'
import {
  CreateNormalExerciseRoutineRequest,
  ExerciseInRoutine,
  ExerciseRoutineDetailResponse
} from '../../../types/exerciseRoutine'
import { createUuid, getNumber } from '../../../helpers/string'
import { ListedExercise } from '../../../types/exercises'
import StyledCustomTextInput from '../../../components/StyledCustomTextInput'
import ListaVaziaText from '../../../components/ListaVaziaText'
import ExercicioTreino from './ExercicioTreino'
import FloatingActionButtonGroup from '../../../components/FloatingActionButtonGroup'
import ModalEditaConfigTreino from './ModalEditaConfigTreino'

interface CreateTrainingProps {
  route: RouteProp<TrainingRouter>
}

const CreateTraining = ({ route }: CreateTrainingProps) => {
  const { navigate, goBack, addListener } =
    useNavigation<NativeStackNavigationProp<TrainingRouter>>()
  const dispatch = useAppDispatch()

  const { getExerciseRoutine, createNormalRoutine, updateRoutine } =
    useExerciseRoutineService()
  const [isEditando, setIsEditando] = useState(false)
  const [exerciseRoutine, setExerciseRoutine] =
    useState<ExerciseRoutineDetailResponse>()
  const [treinoConfig, setTreinoConfig] = useState<TreinoSet>()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalEditaTreinoOpen, setIsModalEditaTreinoOpen] = useState(false)
  const { show: toastShow } = Toast
  const title = useAppSelector((state) => state.treinoSlice.tituloAbaTreino)

  const [nomeTreino, setNomeTreino] = useState<string>('')
  const treinoProps = route.params as TrainingRouter['CreateTraining']

  const getListRoutineExercise = (
    exercises: ListedExercise[],
    prev?: ExerciseRoutineDetailResponse
  ) => {
    if (treinoProps.exercicios) {
      return treinoProps.exercicios.map((ex) => {
        const indexExCadastrado = exercises.findIndex(
          (exT) => exT.exerciseId === ex.exerciseId
        )
        if (indexExCadastrado >= 0 && prev) {
          return prev.listRoutineExercise[indexExCadastrado]
        }
        const newExercise: ExerciseInRoutine = {
          routineExerciseId: Number(getNumber(createUuid())),
          execise: ex,
          observation: null,
          series: null,
          repetitions: null,
          exerciseWeight: null,
          restTime: null,
          biSetExercise: []
        }
        return newExercise
      })
    }
    return []
  }
  useEffect(() => {
    if (treinoProps) {
      if (treinoProps.treinoId) {
        setIsEditando(true)
        setIsLoading(true)
        getExerciseRoutine(Number(treinoProps.treinoId)).then((res) => {
          if (res.data?.body) {
            setExerciseRoutine(res.data.body)
            setNomeTreino(res.data.body.routineName)
            setIsLoading(false)
          }
        })
      }
      if (treinoProps.exercicios) {
        setExerciseRoutine((prev) => {
          if (prev) {
            const exercises = prev.listRoutineExercise.map((ex) => {
              return ex.execise
            })
            return {
              ...prev,
              listRoutineExercise: getListRoutineExercise(exercises, prev)
            }
          }
          return {
            routineId: Number(getNumber(createUuid())),
            routineName: '',
            description: '',
            series: null,
            repetitions: null,
            restTime: null,
            listRoutineExercise: getListRoutineExercise([], prev)
          }
        })
      }
    }
  }, [treinoProps])

  addListener('beforeRemove', () => {
    dispatch(setExerciciosParaTreino([]))
  })
  const handleAdicionaExercicios = () => {
    navigate('SelecionaExercicio', {
      vaiSelecionarExercicios: true,
      exerciciosTreino:
        exerciseRoutine?.listRoutineExercise.map((ex) => ex.execise) || []
    })
  }

  const handleSalvaTreino = async () => {
    if (nomeTreino.length < 3) {
      toastShow('Necessário informar um nome para o treino')
      return
    }
    if (exerciseRoutine?.listRoutineExercise.length === 0) {
      toastShow('Necessário adicionar pelo menos 1 exercício')
      return
    }
    if (exerciseRoutine) {
      const requestData: CreateNormalExerciseRoutineRequest = {
        series: exerciseRoutine?.series,
        repetitions: exerciseRoutine.repetitions,
        exerciseList: exerciseRoutine.listRoutineExercise.map((ex) => {
          return {
            exerciseId: ex.execise.exerciseId,
            restTime: ex.restTime,
            repetitions: ex.repetitions,
            series: ex.series,
            obervation: ex.observation
          }
        }),
        observation: exerciseRoutine.description,
        restTime: exerciseRoutine.restTime,
        routineName: nomeTreino
      }
      try {
        if (isEditando) {
          await updateRoutine(exerciseRoutine.routineId, requestData)
        } else {
          await createNormalRoutine(requestData)
        }
        dispatch(setExerciciosParaTreino([]))
        navigate({ key: 'ListTrainings' })
      } catch (e) {
        // @ts-ignore
        console.log(e.toString())
        toastShow(`Falha ao ${isEditando ? 'Cadastrar' : 'Editar'} treino`)
      }
    } else {
      toastShow('Falha ao criar Treino')
    }
  }
  const excluiExercicio = (exercicioId: number) => {
    setExerciseRoutine((prev) => {
      if (prev) {
        return {
          ...prev,
          listRoutineExercise: prev.listRoutineExercise.filter(
            (ex) => ex.routineExerciseId !== exercicioId
          )
        }
      }
    })
  }

  const handleEditaExercicio = (
    exercicioId: number,
    exercicio: ExercicioSetup
  ) => {
    setExerciseRoutine((prev) => {
      if (prev) {
        return {
          ...prev,
          listRoutineExercise:
            prev?.listRoutineExercise.map((ex) => {
              if (ex.routineExerciseId === exercicioId) {
                return {
                  ...ex,
                  repetitions: exercicio.repeticoes,
                  exerciseWeight: exercicio.carga,
                  series: exercicio.series
                }
              }
              return ex
            }) || []
        }
      }
    })
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <View style={{ width: 40 }} />
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
      <FlatList<ExerciseInRoutine>
        data={exerciseRoutine?.listRoutineExercise ?? []}
        keyExtractor={(item) => item.routineExerciseId.toString()}
        ListEmptyComponent={
          <ListaVaziaText
            hpPercentage={'35%'}
            text={'Sem exercicios cadastrados'}
          />
        }
        style={{ width: '100%' }}
        renderItem={(e) => (
          <ExercicioTreino
            key={`${e.index}-${e.item.execise.name}-${e.item.routineExerciseId}`}
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
            onPress: () => setIsModalEditaTreinoOpen(true),
            label: 'Informações Adicionais',
            isFontAwesome: true,
            iconName: 'gear'
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
