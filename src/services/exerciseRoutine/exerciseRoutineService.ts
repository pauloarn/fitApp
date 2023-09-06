import { makeService } from '../abstractHookService'
import {
  CreateRandomExerciseRoutineRequest,
  ExerciseRoutineDetailResponse,
  ExerciseRoutineItem
} from '../../types/exerciseRoutine'
import { Pageable } from '../../types/genericTypes'

const useExerciseRoutineService = makeService(
  'exercise-routine',
  ({ get, post, del }) => {
    const createRandomRoutine = (data: CreateRandomExerciseRoutineRequest) => {
      const { response } = post<{ body: ExerciseRoutineDetailResponse }>(
        'random',
        data
      )
      return response
    }

    const deleteRoutine = (routineId: number) => {
      const { response } = del(`${routineId}`)
      return response
    }

    const getAllRoutines = () => {
      const { response } = get<{ body: Pageable<ExerciseRoutineItem> }>('')
      return response
    }

    const getExerciseRoutine = (routineId: number) => {
      const { response } = get<{ body: ExerciseRoutineDetailResponse }>(
        `${routineId}`
      )
      return response
    }

    return {
      getExerciseRoutine,
      deleteRoutine,
      getAllRoutines,
      createRandomRoutine
    }
  }
)

export default useExerciseRoutineService
