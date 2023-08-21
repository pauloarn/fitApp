import { makeService } from '../abstractHookService'
import { CategoriesResponse } from '../../types/categories'

const exerciseTypeService = makeService('exercise-type', ({ get }) => {
  const getExerciseTypes = () => {
    const { response } = get<{ body: CategoriesResponse[] }>('')

    return response.then((res) => res)
  }
  return {
    getExerciseTypes
  }
})

export default exerciseTypeService
