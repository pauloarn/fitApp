import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useStyles from './styles'

interface CategorySelectorHeader {
  label: string
  handleCancel: () => void
}
const CategorySelectorHeader = ({
  label,
  handleCancel
}: CategorySelectorHeader) => {
  const styles = useStyles()
  return (
    <View style={styles.headerContainer}>
      <View style={{ width: '20%' }}></View>
      <Text style={styles.headerText}>{label}</Text>
      <TouchableOpacity
        style={{ width: '20%', alignItems: `center` }}
        onPress={handleCancel}
      >
        <Text style={{ color: 'blue' }}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CategorySelectorHeader
