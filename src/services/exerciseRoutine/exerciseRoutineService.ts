import { makeService } from '../abstractHookService'
import {
  CreateRandomExerciseRoutineRequest,
  ExerciseRoutineDetailResponse
} from '../../types/exerciseRoutine'

const useExerciseRoutineService = makeService(
  'exercise-routine',
  ({ get, post }) => {
    const createRandomRoutine = (data: CreateRandomExerciseRoutineRequest) => {
      const { response } = post<{ body: ExerciseRoutineDetailResponse }>(
        'random',
        data
      )

      return response
    }

    const getExerciseRoutine = (treinoId: number) => {
      const { response } = get<{ body: ExerciseRoutineDetailResponse }>('')

      return response
    }

    return {
      getExerciseRoutine,
      createRandomRoutine
    }
  }
)

export default useExerciseRoutineService
