import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExerciciosComIdInterface } from '../../types/exercises'
import { SelectOptions } from '../../components/DropDown/types'

interface ExerciseSlice {
  grupoMuscular: SelectOptions[]
  tipoTreino: SelectOptions[]
  tipoEquipamento: SelectOptions[]
  exercicioSelecionado: ExerciciosComIdInterface | null
}

const initialState: ExerciseSlice = {
  tipoTreino: [],
  grupoMuscular: [],
  tipoEquipamento: [],
  exercicioSelecionado: null
}

export const exerciseSlice = createSlice({
  name: 'exerciseSlice',
  initialState,
  reducers: {
    setTipoEquipamento: (
      state,
      action: PayloadAction<ExerciseSlice['tipoEquipamento']>
    ) => {
      state.tipoEquipamento = action.payload
    },
    setGrupoMuscular: (
      state,
      action: PayloadAction<ExerciseSlice['grupoMuscular']>
    ) => {
      state.grupoMuscular = action.payload
    },
    setTipoTreino: (
      state,
      action: PayloadAction<ExerciseSlice['tipoTreino']>
    ) => {
      state.tipoTreino = action.payload
    },
    setExercicioSelecionado: (
      state,
      action: PayloadAction<ExerciseSlice['exercicioSelecionado']>
    ) => {
      state.exercicioSelecionado = action.payload
    }
  }
})
export const { setGrupoMuscular, setTipoTreino, setTipoEquipamento } =
  exerciseSlice.actions

export default exerciseSlice.reducer
