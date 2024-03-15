import { SelectOptions } from './types'
import useStyles from './styles'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useState } from 'react'
import CustomSelectorModal from '../CustomSelectorModal'
import { Null } from '../../types/genericTypes'
import { stringLimit } from '../../utils/stringUtils'

type DropDownProps = DropDownPropsSingle | DropDownMultipleProps
interface DropDownSharedProps {
  label: string
  items: SelectOptions[]
  maxSelectSize?: number
}
interface DropDownPropsSingle extends DropDownSharedProps {
  isMultiple: false
  selected: number | null
  onValueChange(selectedItem: number | null): void
}

interface DropDownMultipleProps extends DropDownSharedProps {
  isMultiple: true
  selected: number[]
  onValueChange(selectedItem: number[]): void
}

const DropDown = ({
  selected,
  onValueChange,
  isMultiple,
  items,
  maxSelectSize,
  label
}: DropDownProps) => {
  const styles = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const getValueFromId = useCallback(() => {
    if (isMultiple) {
      const selecteds = items
        .filter((i) => i.value && selected.includes(i.value))
        .map((i) => i.label)
      if (selecteds.length > 0) {
        return selecteds.join(`, `)
      }
      return null
    }
    const selectedIndex = items.findIndex((i) => i.value === selected)
    if (selectedIndex > -1) {
      return items[selectedIndex].label
    }
    return null
  }, [selected])

  const selectedItem = getValueFromId()

  const handleSelectMultipleItem = (selectedValue: number[]) => {
    if (isMultiple) {
      onValueChange([...selectedValue])
    }
  }

  const handleSelectSingleItem = (selectedValue: Null<number>) => {
    if (!isMultiple) {
      onValueChange(selectedValue)
    }
  }

  const handleOpenModal = () => {
    Keyboard.dismiss()
    setIsOpen(true)
  }

  const getLabel = () => {
    if (selectedItem) {
      return stringLimit(selectedItem, 42)
    }
    return label
  }
  const getSelector = () => {
    if (isMultiple) {
      return (
        <CustomSelectorModal
          isMultiple={true}
          maxSelectionSize={maxSelectSize}
          isModalOpen={isOpen}
          addAllItem={false}
          labelSelector={label}
          handleCloseSelector={() => setIsOpen(false)}
          handleSelectItem={(items) => {
            handleSelectMultipleItem(items)
            if (!isMultiple) {
              setIsOpen(false)
            }
          }}
          selectedItem={selected}
          items={items}
        />
      )
    }
    return (
      <CustomSelectorModal
        isMultiple={false}
        isModalOpen={isOpen}
        addAllItem={false}
        labelSelector={label}
        handleCloseSelector={() => setIsOpen(false)}
        handleSelectItem={(item) => {
          handleSelectSingleItem(item?.value || null)
          setIsOpen(false)
        }}
        selectedItem={selected ?? null}
        items={items}
      />
    )
  }

  return (
    <View style={styles.container}>
      {selectedItem ? (
        <View style={styles.placeHolder}>
          <Text style={{ ...styles.text, fontSize: 13 }}>{label}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.text}>{getLabel()}</Text>
        <MaterialIcons
          name={'arrow-drop-down'}
          size={25}
          color={'white'}
          style={{ marginTop: -5 }}
        />
      </TouchableOpacity>
      {isOpen ? getSelector() : null}
    </View>
  )
}
export default DropDown
