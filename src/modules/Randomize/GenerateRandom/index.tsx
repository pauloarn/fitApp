import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import DropDown from '../../../components/DropDown'
import { useState } from 'react'
import { SelectOptions } from '../../../components/DropDown/types'
import { useAppSelector } from '../../../hooks/useRedux'
import { FontAwesome5 } from '@expo/vector-icons'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import Toast from 'react-native-root-toast'
import { defaults } from '../../../defaults'
import CustomNumberInput from '../../../components/CustomNumberInput'
import exercicioService from '../../../database/services/ExercicioService'
import { Exercicio } from '../../../database/model/Exercicio'
import { selectNumberInRange } from '../../../helpers/random'
import { Treino } from '../../../database/model/Treino'
import { createUuid } from '../../../helpers/string'
import treinoService from '../../../database/services/TreinoService'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RandomTrainingRouter } from '../../../types/routes'

const Randomize = () => {
  const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] =
    useState<SelectOptions>()
  const [tipoEquipamentoSelecionado, setTipoEquipamentoSelecionado] =
    useState<SelectOptions>(null)
  const [tipoTreinoSelecionado, setTipoTreinoSelecionado] =
    useState<SelectOptions>(null)

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RandomTrainingRouter>>()
  const [quantidadeExercicios, setQuantidadeExercicios] = useState<number>(5)
  const { grupoMuscular, tipoTreino, tipoEquipamento } = useAppSelector(
    (state) => state.exercisesSlice
  )
  const { adicionaTreino } = treinoService()
  const { getExercicios } = exercicioService()

  const handleShuffleExercises = async () => {
    if (!grupoMuscularSelecionado) {
      Toast.show('Necessário selecionar um Grupo Muscular', {
        duration: 1000
      })
      return
    }
    if (quantidadeExercicios <= 2) {
      Toast.show('Quantidade de Exercicios deve ser maior que 2', {
        duration: 1000
      })
      return
    }
    if (grupoMuscularSelecionado) {
      await selecionaExerciciosParaTreinoAleatorio()
    }
  }

  const selecionaExerciciosParaTreinoAleatorio = async () => {
    const exercicios = await getExercicios()
    const exerciciosFiltrados = exercicios.filter((ex) => {
      const incluso: Boolean[] = []
      incluso.push(ex.bodyPart === grupoMuscularSelecionado.value)
      if (tipoTreinoSelecionado) {
        incluso.push(ex.exerciseType === tipoTreinoSelecionado.value)
      }
      if (tipoEquipamentoSelecionado) {
        incluso.push(ex.equipmentType === tipoEquipamentoSelecionado.value)
      }
      return incluso.every(Boolean)
    })
    if (exerciciosFiltrados.length === 0) {
      Toast.show('Nenhum exercício em nossa base, contempla os filtros', {
        duration: 1000
      })
      return
    }
    const exerciciosParaTreino: Exercicio[] = []
    for (let i = 0; i < quantidadeExercicios; i++) {
      const selectedTreino =
        exerciciosFiltrados[selectNumberInRange(exerciciosFiltrados.length)]
      if (exerciciosParaTreino.includes(selectedTreino)) {
        break
      }
      exerciciosParaTreino.push(selectedTreino)
    }
    const treino: Treino = {
      exercicios: exerciciosParaTreino.map((ex) => {
        return {
          ...ex,
          criacao: new Date()
        }
      }),
      id: createUuid(),
      nome: `Treino Aleatório - ${grupoMuscularSelecionado.label}`,
      treinoSet: {
        series: 3,
        observacao: 'Exercicio gerado pela ferramenta de treino aleatório',
        repeticoes: 15
      }
    }
    navigate('Visualizar', { treinoGerado: treino })
  }

  const getButtonBackgroundColor = (): string => {
    if (grupoMuscularSelecionado && quantidadeExercicios > 2) {
      return defaults.corBotaoFab
    }
    return 'darkcyan'
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.stylesMainText}>Bem vindo ao gerador de treinos</Text>
      <Text style={styles.styleSubText}>
        Selecione o grupo musuclar que deseja treinar e serão selecionados
        exercicios aleatórios para compor seu treino!
      </Text>
      <View style={styles.dropDownView}>
        <DropDown
          selectedValue={grupoMuscularSelecionado}
          onValueChange={setGrupoMuscularSelecionado}
          label={'Grupo Muscular *'}
          items={grupoMuscular}
        />
      </View>
      <View style={styles.dropDownView}>
        <DropDown
          selectedValue={tipoTreinoSelecionado}
          onValueChange={setTipoTreinoSelecionado}
          label={'Tipo Treino'}
          items={tipoTreino}
        />
      </View>
      <View style={styles.dropDownView}>
        <DropDown
          selectedValue={tipoEquipamentoSelecionado}
          onValueChange={setTipoEquipamentoSelecionado}
          label={'Tipo Equipamento'}
          items={tipoEquipamento}
        />
      </View>
      <View style={styles.dropDownView}>
        <CustomNumberInput
          value={quantidadeExercicios}
          labelInput={'Quantidade Exercicios *'}
          onChangeNumber={setQuantidadeExercicios}
          style={{
            backgroundColor: defaults.corBackGround,
            height: 40,
            fontSize: 15
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: heightPercentageToDP('10%'),
          backgroundColor: getButtonBackgroundColor(),
          padding: 15,
          borderRadius: 30
        }}
        onPress={handleShuffleExercises}
      >
        <FontAwesome5 name={'random'} color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default Randomize
