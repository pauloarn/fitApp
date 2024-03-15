import {
  setGrupoMuscular,
  setTipoEquipamento,
  setTipoTreino
} from '../redux/slices/exercisesSlice'
import bodyPartService from '../services/bodyPart/bodyPartService'
import exerciseTypeService from '../services/exerciseType/exerciseTypeService'
import equipmentTypeService from '../services/equipmentType/equipmentTypeService'
import { useAppDispatch } from './useRedux'
import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootRouter } from '../types/routes'

export const useCategories = () => {
  const { getBodyParts } = bodyPartService()
  const { getExerciseTypes } = exerciseTypeService()
  const { getEquipmentTypes } = equipmentTypeService()
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation<NativeStackNavigationProp<RootRouter>>()
  const getCategories = async () => {
    Promise.all([getBodyParts(), getExerciseTypes(), getEquipmentTypes()]).then(
      ([bodyPartsResponse, exerciseTypesResponse, equipmentTypesResponse]) => {
        if (bodyPartsResponse.data) {
          dispatch(
            setGrupoMuscular(
              bodyPartsResponse.data.body.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
        if (exerciseTypesResponse.data) {
          dispatch(
            setTipoTreino(
              exerciseTypesResponse.data.body.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
        if (equipmentTypesResponse.data) {
          dispatch(
            setTipoEquipamento(
              equipmentTypesResponse.data.body.map((bp) => {
                return { value: bp.id, label: bp.nome }
              })
            )
          )
        }
      }
    )

    navigate('MainRouter', {})
  }

  return { getCategories }
}
