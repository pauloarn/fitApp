import { SelectOptions } from './types'
import useStyles from './styles'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import DialogOptions from '../DialogOptions'
import { useCallback, useState } from 'react'

interface IDropDownProps {
  selectedValue: number | null
  onValueChange(selectedItem: number | null): void
  label: string
  items: SelectOptions[]
}

const DropDown = ({
  selectedValue,
  onValueChange,
  items,
  label
}: IDropDownProps) => {
  const styles = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const getValueFromId = useCallback(() => {
    const selected = items.findIndex((i) => i.value === selectedValue)
    if (selected > -1) {
      return items[selected]
    }
    return null
  }, [selectedValue])

  const selected = getValueFromId()

  const handleSelectItem = (selectedValue: SelectOptions | null) => {
    onValueChange(selectedValue ? selectedValue.value : null)
  }

  const handleOpenModal = () => {
    Keyboard.dismiss()
    setIsOpen(true)
  }

  return (
    <View style={styles.container}>
      {selectedValue && (
        <View style={styles.placeHolder}>
          <Text style={{ ...styles.text, fontSize: 13 }}>{label}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.text}>{selected ? selected.label : label}</Text>
        <MaterialIcons
          name={'arrow-drop-down'}
          size={25}
          color={'white'}
          style={{ marginTop: -5 }}
        />
      </TouchableOpacity>
      {isOpen && (
        <DialogOptions
          handleClose={() => setIsOpen(false)}
          isOpen={isOpen}
          title={label}
          items={items}
          onValueChange={handleSelectItem}
        />
      )}
    </View>
  )
}

export default DropDown
