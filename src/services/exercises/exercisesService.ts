import { makeService } from '../abstractHookService'
import { ListedExercise } from '../../types/exercises'
import { Pageable } from '../../types/genericTypes'

const exercisesService = makeService('exercises', ({ get }) => {
  const getAllExercises = (query: string) => {
    const { response } = get<{ body: Pageable<ListedExercise> }>(query)

    return response
  }

  return { getAllExercises }
})

export default exercisesService
