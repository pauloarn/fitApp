import { Text, TouchableOpacity } from 'react-native'
import useStyles from './styles'
import { SelectOptions } from '../DropDown/types'
import { Null } from '../../types/genericTypes'
import { useCallback, useState } from 'react'
import { stringLimit } from '../../utils/stringUtils'
import CustomSelectorModal from '../CustomSelectorModal'

interface CategorySelectorProps {
  noSelectedLabel: string
  selectedOption: Null<number>
  options: SelectOptions[]
  fieldLabel: string
  onSelect: (option: SelectOptions) => void
}
const CategorySelector = ({
  noSelectedLabel,
  onSelect,
  options,
  fieldLabel,
  selectedOption
}: CategorySelectorProps) => {
  const styles = useStyles()
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const tempLabel = useCallback(() => {
    if (selectedOption) {
      const selectedItem = options.find((o) => o.value === selectedOption)
      if (selectedItem) {
        return stringLimit(selectedItem.label, 20)
      }
      return noSelectedLabel
    }
    return noSelectedLabel
  }, [selectedOption])

  const handleSelectItem = (item: Null<SelectOptions>) => {
    setIsSelectorOpen(false)
    if (item) {
      onSelect(item)
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIsSelectorOpen(true)
      }}
    >
      <Text style={styles.selectorText}>{tempLabel()}</Text>
      <CustomSelectorModal
        labelSelector={fieldLabel}
        isModalOpen={isSelectorOpen}
        handleCloseSelector={() => {
          setIsSelectorOpen(false)
        }}
        selectedItem={selectedOption}
        handleSelectItem={handleSelectItem}
        items={options}
      />
    </TouchableOpacity>
  )
}

export default CategorySelector
