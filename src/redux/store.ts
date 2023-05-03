import { configureStore } from '@reduxjs/toolkit'
import exercisesSlice from './slices/exercisesSlice'
import modalSlice from './slices/modalSlice'
import treinoSlice from './slices/treinoSlice'

const store = configureStore({
  reducer: {
    treinoSlice: treinoSlice,
    exercisesSlice: exercisesSlice,
    modalSlice: modalSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
