import { ExercicioTreinoConfig } from './ExercicioTreinoConfig'

export interface Treino {
  id: string
  nome: string

  treinoSet: TreinoSet
  exercicios: ExercicioTreinoConfig[]
}

export interface TreinoSet {
  repeticoes: number
  series: number
  observacao: string
}
