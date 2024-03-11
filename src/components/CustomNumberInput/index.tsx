import { CustomTextInputProps } from '../CustomTextInput'
import { Null, Undefined } from '../../types/genericTypes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import { defaults } from '../../defaults'

interface CustomNumberInputProps
  extends Omit<
    CustomTextInputProps,
    'value' | 'onChange' | 'onChangeText' | 'label'
  > {
  onChangeNumber?: (value: Undefined<number>) => void
  value: Undefined<Null<number>>
  currency?: boolean
  percent?: boolean
  digit?: number
  format?: boolean
  readOnly?: boolean
  max?: number
  maxLength?: number
  labelInput?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  mask?: string
  debounceTime?: number
}
const CustomNumberInput = ({
  onChangeNumber,
  value,
  currency = false,
  percent = false,
  digit = 0,
  format = false,
  max,
  maxLength = 15,
  endIcon,
  mask,
  debounceTime,
  labelInput,
  ...props
}: CustomNumberInputProps) => {
  const [numberValue, setNumberValue] = useState<Undefined<string>>()
  const debounceNumber = useCallback(
    (n: Undefined<number>) => {
      if (debounceTime) {
        setTimeout(onChangeNumber, debounceTime, n)
      } else {
        onChangeNumber?.(n)
      }
    },
    [onChangeNumber, debounceTime]
  )
  const digits = useMemo(() => {
    if (!mask) {
      return {
        integer: 1,
        decimal: currency ? 2 : digit || 0
      }
    }
    const [auxInteger, auxDecimal] = mask.split(',')
    return {
      integer: !auxInteger.length ? 1 : auxInteger.length,
      decimal: !auxDecimal ? 0 : auxDecimal.length
    }
  }, [mask])

  if (currency) digit = 2

  const formatDecimalNumber = (value: string) => {
    return (Number(value) / Math.pow(10, digit)).toString()
  }

  const maxValue = (value: string) => {
    if (max !== undefined) {
      return Number(value) > max ? max.toString() : value
    }
  }

  const truncateValue = (value: string) => {
    if (maxLength === 0) return 0
    if (maxLength) {
      const truncateValue = maxLength > 15 ? 15 : maxLength
      return value.length >= truncateValue
        ? value.slice(0, truncateValue)
        : value
    }
  }

  const formater = (value: string | undefined) => {
    if (!value) return value
    return Intl.NumberFormat('pt-BR', {
      minimumIntegerDigits: digits.integer,
      minimumFractionDigits: digits.decimal
    }).format(Number(value))
  }

  const currencyFormater = (value: string | undefined) => {
    const formater = Intl.NumberFormat('pt-Br', {
      style: 'currency',
      currency: 'BRL'
    })
    return formater.format(Number(value) || 0).replace('R$', '')
  }

  const renderNumber = () => {
    if (currency) return currencyFormater(numberValue)
    if (format || mask) return formater(numberValue)
    return numberValue
  }

  const onChangeInput = (value: string) => {
    if (!value) {
      setNumberValue(undefined)
      debounceNumber(undefined)
      return
    }
    let result = value.replace(/\D+/g, '')
    result = String(Number(result))
    if (maxLength) result = truncateValue(result) as string
    if (digit >= 2 || currency) result = formatDecimalNumber(result)
    if (max !== undefined) result = maxValue(result) as string
    debounceNumber(Number(result))
    setNumberValue(result)
  }

  const getPercentPrefix = () => {
    return percent ? (
      <TextInput.Icon
        icon={() => <FontAwesome5 name={'percent'} color={'white'} size={15} />}
      />
    ) : (
      endIcon
    )
  }

  useEffect(() => {
    if (value === 0 && numberValue === '0') return
    if (value || value === 0) return setNumberValue(value?.toString())
  }, [value, numberValue])

  const label = () => {
    if (numberValue) {
      return (
        <Text
          style={{
            color: 'white',
            backgroundColor: defaults.corBackGround,
            paddingHorizontal: 2
          }}
        >
          {labelInput}
        </Text>
      )
    }
  }

  return (
    <TextInput
      right={getPercentPrefix()}
      mode={'outlined'}
      placeholderTextColor={'white'}
      underlineColor={'white'}
      activeUnderlineColor={'white'}
      cursorColor={'white'}
      selectionColor={'white'}
      textColor={'white'}
      activeOutlineColor={'white'}
      outlineColor={'white'}
      value={renderNumber()}
      placeholder={labelInput}
      label={label()}
      onChangeText={(e) => onChangeInput(e)}
      autoComplete={'off'}
      keyboardType={'number-pad'}
      {...props}
    />
  )
}

export default CustomNumberInput
