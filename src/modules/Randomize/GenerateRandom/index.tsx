import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import DropDown from '../../../components/DropDown'
import { useState } from 'react'
import { useAppSelector } from '../../../hooks/useRedux'
import { FontAwesome5 } from '@expo/vector-icons'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { defaults } from '../../../defaults'
import CustomNumberInput from '../../../components/CustomNumberInput'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RandomTrainingRouter } from '../../../types/routes'
import { Null, Undefined } from '../../../types/genericTypes'
import useExerciseRoutineService from '../../../services/exerciseRoutine/exerciseRoutineService'

const Randomize = () => {
  const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] = useState<
    number[]
  >([])
  const [tipoEquipamentoSelecionado, setTipoEquipamentoSelecionado] =
    useState<Null<number>>(null)
  const [tipoTreinoSelecionado, setTipoTreinoSelecionado] =
    useState<Null<number>>(null)
  const { createRandomRoutine } = useExerciseRoutineService()
  const [isLoading, setIsLoadin] = useState(false)
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RandomTrainingRouter>>()
  const [quantidadeExercicios, setQuantidadeExercicios] =
    useState<Undefined<number>>(5)
  const { grupoMuscular, tipoTreino, tipoEquipamento } = useAppSelector(
    (state) => state.exercisesSlice
  )

  // const handleShuffleExercises = async () => {
  //   if (!grupoMuscularSelecionado) {
  //     Toast.show('Necessário selecionar um Grupo Muscular', {
  //       duration: 1000
  //     })
  //     return
  //   }
  //   if (quantidadeExercicios && quantidadeExercicios <= 2) {
  //     Toast.show('Quantidade de Exercicios deve ser maior que 2', {
  //       duration: 1000
  //     })
  //     return
  //   }
  //   setIsLoadin(true)
  //   const res = await createRandomRoutine({
  //     amountOfExercises: quantidadeExercicios || 5,
  //     bodyPartId: grupoMuscularSelecionado,
  //     exerciseTypeId: tipoTreinoSelecionado ?? undefined,
  //     equipmentTypeId: tipoEquipamentoSelecionado ?? undefined
  //   })
  //   if (res.data?.body) {
  //     setIsLoadin(false)
  //     navigate('Visualizar', { treinoId: res.data?.body.routineId })
  //     return
  //   }
  //   Toast.show('Falha ao gerar treino aleatório')
  //   setIsLoadin(false)
  // }

  const getButtonBackgroundColor = (): string => {
    if (
      grupoMuscularSelecionado &&
      quantidadeExercicios &&
      quantidadeExercicios > 2
    ) {
      return defaults.corBotaoFab
    }
    return 'grey'
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
          isMultiple={true}
          maxSelectSize={5}
          selected={grupoMuscularSelecionado}
          onValueChange={setGrupoMuscularSelecionado}
          label={'Grupo Muscular (máximo 5)*'}
          items={grupoMuscular}
        />
      </View>
      <View style={styles.dropDownView}>
        <DropDown
          isMultiple={false}
          selected={tipoTreinoSelecionado}
          onValueChange={setTipoTreinoSelecionado}
          label={'Tipo Treino'}
          items={tipoTreino}
        />
      </View>
      <View style={styles.dropDownView}>
        <DropDown
          isMultiple={false}
          selected={tipoEquipamentoSelecionado}
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
      {isLoading ? (
        <View style={{ marginTop: heightPercentageToDP('10%'), padding: 15 }}>
          <ActivityIndicator size={45} />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            marginTop: heightPercentageToDP('10%'),
            backgroundColor: getButtonBackgroundColor(),
            padding: 15,
            borderRadius: 30
          }}
          onPress={() => console.log('ihi')}
        >
          <FontAwesome5 name={'random'} color={'white'} size={30} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Randomize
