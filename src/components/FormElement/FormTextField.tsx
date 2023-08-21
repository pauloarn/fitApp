import { FieldValues, useController } from 'react-hook-form'
import { ComponentDefaultProps } from './useFormElement'
import { CustomTextInputProps } from '../CustomTextInput'
import StyledCustomTextInput from '../StyledCustomTextInput'
import { zodMessageParse } from '../../utils/zodMessageParseUtils'

export type FormTextFieldProps<E extends FieldValues> = ComponentDefaultProps<
  CustomTextInputProps,
  E
>
const FormTextField = <E extends FieldValues>({
  name,
  control,
  ...props
}: FormTextFieldProps<E>) => {
  const { field, fieldState } = useController({
    control,
    name
  })

  const error = fieldState.error
  return (
    <StyledCustomTextInput
      {...props}
      onChangeText={field.onChange}
      ref={field.ref}
      onBlur={field.onBlur}
      value={props.value || (field.value as never)}
      error={!!error}
      placeholder={error ? zodMessageParse(error) : props.placeholder}
    />
  )
}

export default FormTextField
