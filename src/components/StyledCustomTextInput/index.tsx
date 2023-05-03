import React from 'react'
import { defaults } from '../../defaults'
import CustomTextInput, { CustomTextInputProps } from '../CustomTextInput'

export interface StyledCustomTextInputProps extends CustomTextInputProps {}

const StyledCustomTextInput = (props: StyledCustomTextInputProps) => {
  return (
    <CustomTextInput
      placeholderTextColor={'white'}
      textColor={'white'}
      activeOutlineColor={'white'}
      outlineColor={'white'}
      style={{
        backgroundColor: defaults.corBackTextInput,
        zIndex: 1,
        color: 'white'
      }}
      {...props}
    />
  )
}
export default StyledCustomTextInput
