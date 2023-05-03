import { Null, ObjectKeys } from './genericTypes'
import * as React from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Exercicio } from '../database/model/Exercicio'
import { Treino } from '../database/model/Treino'

export type RootRouter = {
  SplashScreen: {}
  MainRouter: {}
}

export type TrainingRouter = {
  ListTrainings: {}

  CreateTraining: CreateTraningProps

  SelecionaExercicio: {
    vaiSelecionarExercicios: boolean
    exerciciosTreino: Exercicio[]
  }

  DetalheTreino: {
    treinoId: string
  }
}

export type RandomTrainingRouter = {
  Generate: {}

  Visualizar: { treinoGerado: Treino }
}

export interface CreateTraningProps {
  treinoId: Null<string>
  exercicios?: Exercicio[]
}

export type TabsRouter = {
  Search: {}
  Randomize: {}
  Trainings: {}
}

export type InsideRouter = {
  List: undefined
}
export interface BaseScreens<T> {
  path: ObjectKeys<T>
  component: React.ComponentType<{}>
  headerComponent?: (props: NativeStackHeaderProps) => JSX.Element
}

export interface TabScreens<T> extends BaseScreens<T> {
  label?: string
  icon: string
}
