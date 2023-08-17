import { Text, View } from 'react-native'
import styles from './styles'
import { useAppDispatch } from '../../hooks/useRedux'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter } from '../../types/routes'
import ExercicioService from '../../database/services/ExercicioService'
import { useEffect } from 'react'
import bodyPartService from '../../services/bodyPart/bodyPartService'
import exerciseTypeService from '../../services/exerciseType/exerciseTypeService'
import equipmentTypeService from '../../services/equipmentType/equipmentTypeService'
import {
  setGrupoMuscular,
  setTipoEquipamento,
  setTipoTreino
} from '../../redux/slices/exercisesSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../../utils/config'

const SplashScreen = () => {
  const { getBodyParts } = bodyPartService()
  const { getExerciseTypes } = exerciseTypeService()
  const { getEquipmentTypes } = equipmentTypeService()
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation<NativeStackNavigationProp<RootRouter>>()
  const { adicionaVariosExercicios, getExercicios } = ExercicioService()

  const initiate = async () => {
    Promise.all([getBodyParts(), getExerciseTypes(), getEquipmentTypes()]).then(
      ([bodyPartsResponse, exerciseTypesResponse, equipmentTypesResponse]) => {
        if (bodyPartsResponse.data) {
          dispatch(
            setGrupoMuscular(
              bodyPartsResponse.data.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
        if (exerciseTypesResponse.data) {
          dispatch(
            setTipoTreino(
              bodyPartsResponse.data.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
        if (equipmentTypesResponse.data) {
          dispatch(
            setTipoEquipamento(
              bodyPartsResponse.data.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
      }
    )
    const token = await AsyncStorage.getItem(config.localStorageTokenName)
    if (token) {
      navigate('MainRouter')
    } else {
      navigate('LoginScreen')
    }
  }

  useEffect(() => {
    initiate()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.stylesMainText}>My Fit App</Text>
      <Text style={styles.styleSubText}>Carregando dados...</Text>
    </View>
  )
}

export default SplashScreen
