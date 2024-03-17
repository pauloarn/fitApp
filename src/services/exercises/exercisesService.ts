import { makeService } from '../abstractHookService'
import { ListedExercise } from '../../types/exercises'
import { Pageable } from '../../types/genericTypes'

const exercisesService = makeService('exercises', ({ get }) => {
  const getAllExercises = (query: string) => {
    const { response } = get<{ body: Pageable<ListedExercise> }>(query)

    return response
  }

  const getImageExercise = (imgUrl: string) => {
    const {response} = get<{ body: string }>(`/image?imgUrl=${imgUrl}`)
    return response
  }

  return { getAllExercises, getImageExercise }
})

export default exercisesService
