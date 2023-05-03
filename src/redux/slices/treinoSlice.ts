import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Exercicio } from '../../database/model/Exercicio'

interface TreinoSlice {
  exerciciosParaTreino: Exercicio[]
  estaSelecionandoExerciciosParaTreino: boolean
  tituloAbaTreino: string
}

const initialState: TreinoSlice = {
  tituloAbaTreino: 'Cadastro de Treino',
  exerciciosParaTreino: [],
  estaSelecionandoExerciciosParaTreino: false
}

export const treinoSlice = createSlice({
  name: 'treinoSlice',
  initialState,
  reducers: {
    setExerciciosParaTreino: (
      state,
      action: PayloadAction<TreinoSlice['exerciciosParaTreino']>
    ) => {
      state.exerciciosParaTreino = action.payload
    },
    setTituloTreinoEdit: (state, action: PayloadAction<string>) => {
      state.tituloAbaTreino = action.payload
    },
    adicionaExercicioParaTreino: (state, action: PayloadAction<Exercicio>) => {
      const novaLista = [...state.exerciciosParaTreino, action.payload]
      state.exerciciosParaTreino = novaLista
    },
    removeExercicioParaTreino: (state, action: PayloadAction<Exercicio>) => {
      state.exerciciosParaTreino = state.exerciciosParaTreino.filter(
        (ex) => ex.id !== action.payload.id
      )
    },
    setEstaSelecionandoExerciciosParaTreino: (
      state,
      action: PayloadAction<TreinoSlice['estaSelecionandoExerciciosParaTreino']>
    ) => {
      state.estaSelecionandoExerciciosParaTreino = action.payload
    }
  }
})
export const {
  setExerciciosParaTreino,
  setEstaSelecionandoExerciciosParaTreino,
  setTituloTreinoEdit,
  adicionaExercicioParaTreino,
  removeExercicioParaTreino
} = treinoSlice.actions

export default treinoSlice.reducer
