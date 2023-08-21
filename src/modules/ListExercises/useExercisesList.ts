import exercisesService from '../../services/exercises/exercisesService'
import { useEffect, useState } from 'react'
import { ListedExercise } from '../../types/exercises'
import QueryBuilder from '../../utils/queryBuilder'
import { SearchFilterForm } from './SearchArea'
import Toast from 'react-native-root-toast'

const useExercisesList = (filterData: SearchFilterForm) => {
  const [exercisesList, setExercisesList] = useState<ListedExercise[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<
    ListedExercise[]
  >([])
  const [isSelecionandoExercicios, setIsSelecionandoExercicios] =
    useState(false)
  const { getAllExercises } = exercisesService()

  const getQuery = (localPage: number) => {
    const queryBuilder = new QueryBuilder().removeEmptyValue()
    queryBuilder.addQuery('page', localPage)
    queryBuilder.addQuery('size', 20)
    queryBuilder.addQuery('getBase64', true)
    queryBuilder.addQuery('searchText', filterData.muscleName)
    queryBuilder.addQuery('bodyPartId', filterData.muscleGroup)
    queryBuilder.addQuery('equipmentTypeId', filterData.tipoEquipamento)
    queryBuilder.addQuery('exerciseTypeId', filterData.tipoTreino)
    return queryBuilder.build()
  }
  const requestExercises = async () => {
    setIsLoading(true)
    setExercisesList([])
    const query = getQuery(page)
    try {
      const { data } = await getAllExercises(query)
      if (data && data.body) {
        setExercisesList(data.body.content)
        setPage(data.body.number + 1)
      }
      setIsLoading(false)
    } catch (e) {
      Toast.show('Falha ao carregar exercícios')
      console.log(e)
    }
  }

  useEffect(() => {
    requestExercises()
  }, [filterData])

  const handleLoadMoreItems = async () => {
    setIsLoading(true)
    const currentPage = page + 1
    setPage(currentPage)
    const query = getQuery(currentPage)
    try {
      const { data } = await getAllExercises(query)
      if (data && data.body) {
        setExercisesList((prev) => [...prev, ...data.body.content])
        setPage(data.body.number + 1)
      }
      setIsLoading(false)
    } catch (e) {
      Toast.show('Falha ao carregar exercícios')
      console.log(e)
    }
  }

  const handleClickCard = (exercicioSelecionado: ListedExercise) => {
    if (isSelecionandoExercicios) {
      if (
        exerciciosSelecionados.filter(
          (ex) => ex.exerciseId === exercicioSelecionado.exerciseId
        ).length > 0
      ) {
        setExerciciosSelecionados((prev) =>
          prev.filter((ex) => ex.exerciseId !== exercicioSelecionado.exerciseId)
        )
      } else {
        setExerciciosSelecionados((prev) => [...prev, exercicioSelecionado])
      }
    }
  }
  return {
    exercisesList,
    exerciciosSelecionados,
    isLoading,
    handleLoadMoreItems,
    page,
    setExerciciosSelecionados,
    handleClickCard,
    setPage,
    requestExercises
  }
}

export default useExercisesList
