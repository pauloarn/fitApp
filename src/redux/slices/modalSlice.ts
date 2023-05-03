import { Null } from '../../types/genericTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ButtonMode } from 'react-native-paper/lib/typescript/components/Button/utils'

export interface ButtonActionProps {
  label: string
  onPress: () => void
  variant: ButtonMode
}
interface ModalSlice {
  isOpen: boolean
  title?: Null<string>
  containerContent?: Null<React.ReactNode>
  actions?: Null<ButtonActionProps[]>
}

const initialState: ModalSlice = {
  isOpen: false,
  title: null,
  containerContent: null,
  actions: null
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<ModalSlice>) => {
      const { isOpen, title, containerContent, actions } = action.payload
      state.isOpen = isOpen
      state.title = title
      state.containerContent = containerContent
      state.actions = actions
    },
    setIsModalOpen: (state, action: PayloadAction<ModalSlice['isOpen']>) => {
      state.isOpen = action.payload
    },
    resetModal: (state) => {
      state = initialState
    }
  }
})
export const { setOpenModal, setIsModalOpen, resetModal } = modalSlice.actions

export default modalSlice.reducer
