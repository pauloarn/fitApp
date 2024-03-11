import { Exercicio } from './Exercicio'
import { Null } from '../../types/genericTypes'

export interface ExercicioTreinoConfig extends Exercicio {
  exercicioSet?: ExercicioSetup
  criacao: Date
}

export interface ExercicioTreinoExecutado extends ExercicioTreinoConfig {
  executou: boolean
}

export interface ExercicioSetup {
  repeticoes: Null<number>
  series: Null<number>
  carga: Null<number>
}
