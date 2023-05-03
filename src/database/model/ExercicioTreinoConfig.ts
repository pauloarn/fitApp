import { Exercicio } from './Exercicio'

export interface ExercicioTreinoConfig extends Exercicio {
  exercicioSet?: ExercicioSetup
  criacao: Date
}

export interface ExercicioTreinoExecutado extends ExercicioTreinoConfig {
  executou: boolean
}

export interface ExercicioSetup {
  repeticoes: number
  series: number
  carga: number
}
