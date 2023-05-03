import { Text, View } from 'react-native'
import styles from './styles'
import { useAppDispatch } from '../../hooks/useRedux'
import exercicios from '../../data/baseExercicios.json'
import {
  setGrupoMuscular,
  setTipoEquipamento,
  setTipoTreino
} from '../../redux/slices/exercisesSlice'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter } from '../../types/routes'
import { SelectOptions } from '../../components/DropDown/types'
import ExercicioService from '../../database/services/ExercicioService'
import { Exercicio } from '../../database/model/Exercicio'
import { AllowedNames } from '../../types/genericTypes'
import { capitalizeFirstLetter } from '../../helpers/string'
import { useEffect } from 'react'

const SplashScreen = () => {
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation<NativeStackNavigationProp<RootRouter>>()
  const { adicionaVariosExercicios, getExercicios } = ExercicioService()
  const initiate = async () => {
    const ex = await getExercicios()
    dispatch(setGrupoMuscular(getListFromExercicio('bodyPart', 'parteCorpo')))
    dispatch(
      setTipoTreino(getListFromExercicio('exerciseType', 'tipoExercicio'))
    )
    dispatch(
      setTipoEquipamento(
        getListFromExercicio('equipmentType', 'tipoEquipamento')
      )
    )
    if (ex.length === 0) {
      await adicionaVariosExercicios(exercicios)
    }
    navigate('MainRouter')
  }

  const getListFromExercicio = (
    valueKey: AllowedNames<Exercicio, string>,
    labelKey: AllowedNames<Exercicio, string>
  ) => {
    const list: SelectOptions[] = []
    exercicios.forEach((exe: Exercicio) => {
      if (list.findIndex((a) => a.value === exe[valueKey]) === -1) {
        if (exe[valueKey].length > 0) {
          list.push({
            value: exe[valueKey],
            label: capitalizeFirstLetter(exe[labelKey])
          })
        }
      }
    })
    return list.sort((a, b) => {
      const nameA = a.label.toUpperCase()
      const nameB = b.label.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
  }

  useEffect(() => {
    initiate().catch(console.log)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.stylesMainText}>My Fit App</Text>
      <Text style={styles.styleSubText}>Carregando dados...</Text>
    </View>
  )
}

export default SplashScreen
