import { Null, ObjectKeys } from './genericTypes'
import * as React from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Treino } from '../database/model/Treino'
import { ListedExercise } from './exercises'

export type RootRouter = {
  SplashScreen: {}
  MainRouter: {}
  LoginScreen: {}
}

export type TrainingRouter = {
  ListTrainings: {}

  CreateTraining: CreateTraningProps

  SelecionaExercicio: {
    vaiSelecionarExercicios: boolean
    exerciciosTreino: ListedExercise[]
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
  exercicios?: ListedExercise[]
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
