import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SelectOptions } from '../../DropDown/types'
import useStyles from './styles'

interface CustomSelectorItem {
  item: SelectOptions
  isSelected: boolean
  handleSelect: (item: SelectOptions) => void
}
const CustomSelectorItem = ({
  item,
  isSelected,
  handleSelect
}: CustomSelectorItem) => {
  const styles = useStyles()

  return (
    <TouchableOpacity
      style={isSelected ? styles.itemSelectedBtn : styles.itemBtn}
      onPress={() => handleSelect(item)}
    >
      <Text style={isSelected ? styles.selectedItemText : styles.itemText}>
        {item.label}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomSelectorItem
