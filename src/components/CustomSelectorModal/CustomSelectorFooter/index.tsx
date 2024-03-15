import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from './styles'

interface CustomSelectorFooterProps {
  handleConfirm: () => void
  isMultiple: boolean
}
const CustomSelectorFooter = ({
  handleConfirm,
  isMultiple
}: CustomSelectorFooterProps) => {
  const styles = useStyles()
  if (!isMultiple) {
    return null
  }
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm}>
      <Text> Confirmar </Text>
    </TouchableOpacity>
  )
}

export default CustomSelectorFooter
