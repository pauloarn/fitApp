export interface ExerciciosComIdInterface {
  id: string
  url: string
  exerciseName: string
  bodyPart: string
  equipmentType: string
  exerciseType: string

  nomeExercicio: string
  parteCorpo: string
  tipoEquipamento: string
  tipoExercicio: string
  page: number
  item: number
}

export interface ListedExercise {
  exerciseId: number
  name: string
  nome: string
  imageData: {
    imageBase64: string
    imageType: string
  }
}
