import { ListedExercise } from './exercises'
import { Null } from './genericTypes'

export interface CreateRandomExerciseRoutineRequest {
  bodyPartId: number
  exerciseTypeId?: number
  equipmentTypeId?: number
  amountOfExercises: number
}

export interface ExerciseRoutineDetailResponse {
  routineId: number
  routineName: string
  description: string
  series: number
  repetitions: number
  restTime: number
  listRoutineExercise: ExerciseInRoutine[]
}

export interface ExerciseInRoutineExecution extends ExerciseInRoutine {
  hasExecuted: boolean
}

export interface ExerciseInRoutine {
  routineExerciseId: number
  series: Null<number>
  repetitions: Null<number>
  restTime: Null<number>
  observation: Null<string>
  exerciseWeight: Null<number>
  execise: ListedExercise
  biSetExercise: ListedExercise[]
}

export interface ExerciseRoutineItem {
  routineId: number
  routineName: string
  description: string
}
