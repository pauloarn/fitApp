import { useEffect } from 'react'
import {
  Control,
  DefaultValues,
  KeepStateOptions,
  Path,
  useForm,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { merge } from 'lodash'
import { FormState } from 'react-hook-form/dist/types/form'
import { z } from '../../utils/zodMessageParseUtils'

interface FormProps<T> {
  validation: z.ZodSchema<T>
  defaultValues: DefaultValues<T>
  enableQueryValues?: boolean
  validationOnStart?: boolean
  validationOnReset?: boolean
}

export type ComponentDefaultProps<T, E> = T & {
  name: Path<E>
  control: Control<E>
}

export interface FormElementReturn<T> {
  formState: FormState<T>
  setValue: UseFormSetValue<T>
  getValues: UseFormGetValues<T>
  control: Control<T>
  reset: UseFormReset<T>
  submit: (cb: (data: T) => void) => () => void
  watch: UseFormWatch<T>
  trigger: UseFormTrigger<T>
  register: UseFormRegister<T>
  setError: UseFormSetError<T>
  clearErrors: UseFormClearErrors<T>
  setFocus: UseFormSetFocus<T>
  resetField: UseFormResetField<T>
  getFieldState: UseFormGetFieldState<T>
}

const useFormElement = <T,>({
  defaultValues,
  validation,
  enableQueryValues = false,
  validationOnStart = false,
  validationOnReset = true
}: FormProps<T>): FormElementReturn<T> => {
  const methods = useForm<T>({
    resolver: zodResolver(validation),
    defaultValues
  })
  const {
    control,
    handleSubmit,
    formState,
    reset,
    trigger,
    setValue,
    getValues,
    watch,
    setError,
    register,
    clearErrors,
    setFocus,
    resetField,
    getFieldState
  } = methods

  useEffect(() => {
    const resetValues = enableQueryValues ? merge(defaultValues) : defaultValues
    if (control) {
      reset(resetValues as any)
      if (validationOnStart) trigger().then()
    }
  }, [])

  const onFormSubmit = (data: T, cb: (data: T) => void) => {
    cb(data)
  }

  const onReset = (
    values?: DefaultValues<T>,
    keepStateOptions?: KeepStateOptions
  ) => {
    const defaultVal = values || defaultValues
    reset(defaultVal, keepStateOptions)
    if (validationOnReset) trigger()
  }

  const onSetValue: UseFormSetValue<T> = (name, value, options) => {
    setValue(name, value, options)
  }

  return {
    formState,
    setValue: onSetValue,
    getValues,
    control,
    reset: onReset,
    submit: (cb: (data: T) => void) =>
      handleSubmit((data: any) => onFormSubmit(data, cb)),
    watch,
    trigger,
    register,
    setError,
    clearErrors,
    setFocus,
    resetField,
    getFieldState
  } as FormElementReturn<T>
}

export default useFormElement
