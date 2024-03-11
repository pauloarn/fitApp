import { TextInput } from 'react-native-paper'
import React, { useEffect, useRef, useState } from 'react'
import { Props as TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { Pattern } from '../../types/utils'
import { getNumber, mask } from '../../helpers/string'
import { Undefined } from '../../types/genericTypes'

export interface CustomTextInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'label'> {
  fieldLimit?: number
  pattern?: Pattern[] | string
  isPassword?: boolean
  label?: string
  showLimitCounter?: boolean
  justNumber?: boolean
  onChangeText?: (texto: string) => void
}

const CustomTextInput = ({
  fieldLimit,
  onChangeText,
  label,
  value,
  isPassword,
  pattern,
  showLimitCounter = true,
  justNumber,
  ...props
}: CustomTextInputProps) => {
  const [textValue, setTextValue] = useState('')
  const lastPattern = useRef('')
  const lastValues = useRef(['', ''])

  const [isPasswordVisible, setIsPasswordVisible] = useState(true)
  const limitarTexto = (text: string) => {
    if (fieldLimit && text.length > fieldLimit) {
      return text.slice(0, fieldLimit)
    }
    return text
  }
  const getLimitCaracterText = () => {
    if (!fieldLimit) return undefined
    return `${label} - ${fieldLimit - textValue.length} caracter(es)`
  }

  useEffect(() => {
    if (value) {
      if (!lastValues.current.includes(value) || pattern) {
        applyMask(value)
      }
    } else {
      setTextValue((props.defaultValue as Undefined<string>) || '')
    }
  }, [value])
  const getHelperText = () => {
    if (props) {
      if (showLimitCounter) {
        return getLimitCaracterText()
      }
    }
    return undefined
  }

  const onChange = (value: string) => {
    applyMask(value)
  }
  const applyMask = (value: string) => {
    let val: string
    if (pattern) {
      let patt = ''
      if (typeof pattern === 'string') {
        patt = pattern
      } else {
        for (const pt of pattern) {
          if (typeof pt[0] === 'boolean') {
            patt = pt[1]
            break
          } else if (typeof pt === 'string') {
            const lenPattern = (pt.match(/#/g) || []).length
            if (lenPattern >= getNumber(value).length) {
              patt = pt
              break
            }
          }
        }
      }

      patt ? (lastPattern.current = patt) : (patt = lastPattern.current)
      value = value.substring(0, patt.length)
      const unMask = getNumber(value)

      const maskValue = mask(unMask, patt, justNumber)

      setTextValue(limitarTexto(maskValue))
      val = unMask
      lastValues.current = [val, value]
    } else {
      val = justNumber ? getNumber(value) : value
      setTextValue(limitarTexto(val))
    }

    if (onChangeText) onChangeText(limitarTexto(val))
  }

  return (
    <TextInput
      mode={'outlined'}
      label={getHelperText()}
      activeOutlineColor={'transparent'}
      cursorColor={'white'}
      outlineColor={`transparent`}
      placeholder={getHelperText()}
      secureTextEntry={isPassword && isPasswordVisible}
      right={
        isPassword ? (
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye' : 'eye-off'}
            iconColor={'white'}
            onPress={() => {
              setIsPasswordVisible((prev) => !prev)
            }}
          />
        ) : null
      }
      dense
      {...props}
      onChangeText={onChange}
      value={textValue}
    />
  )
}
export default CustomTextInput
