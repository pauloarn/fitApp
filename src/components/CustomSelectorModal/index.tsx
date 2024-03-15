import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SelectOptions } from '../DropDown/types'
import useStyles from './styles'
import { Null, Undefined } from '../../types/genericTypes'
import CustomSelectorHeader from './CustomSelectorHeader'
import CustomSelectorItem from './CustomSelectorItem'
import CustomSelectorFooter from './CustomSelectorFooter'

interface CustomSelectorModalSharedPros {
  isModalOpen: boolean
  labelSelector: string
  handleCloseSelector: () => void
  addAllItem?: Undefined<boolean>
  maxSelectionSize?: number
  items: SelectOptions[]
}
interface CustomSelectorModalMultipleProps
  extends CustomSelectorModalSharedPros {
  isMultiple: true
  handleSelectItem: (selectedItem: number[]) => void
  selectedItem: number[]
}
interface CustomSelectorModalSingleProps extends CustomSelectorModalSharedPros {
  isMultiple: false
  handleSelectItem: (selectedItem: Null<SelectOptions>) => void
  selectedItem: Null<number>
}
type CustomSelectorModalProps =
  | CustomSelectorModalSingleProps
  | CustomSelectorModalMultipleProps
const CustomSelectorModal = ({
  isModalOpen,
  selectedItem,
  items,
  isMultiple,
  addAllItem = true,
  labelSelector,
  handleCloseSelector,
  handleSelectItem,
  maxSelectionSize
}: CustomSelectorModalProps) => {
  const styles = useStyles(isMultiple)
  const [localSelected, setLocalSelected] = useState<number[]>([])

  const getListToRender = useCallback(() => {
    const itemsToRender = [...items]
    if (addAllItem) {
      itemsToRender.unshift({ value: null, label: `Todos` })
    }
    return itemsToRender
  }, [items])

  useEffect(() => {
    if (isMultiple) {
      setLocalSelected(selectedItem)
    }
  }, [selectedItem])

  const selectItem = (item: SelectOptions, isSelected: boolean) => {
    if (isMultiple) {
      if (item.value) {
        if (isSelected) {
          setLocalSelected(localSelected.filter((i) => i !== item.value))
        } else {
          const selectedItems = [...localSelected, item.value]
          if (selectedItems.length <= Number(maxSelectionSize)) {
            setLocalSelected(selectedItems)
          }
        }
      }
    } else {
      handleSelectItem(item)
    }
  }

  const handleCancelar = () => {
    if (isMultiple) {
      handleSelectItem([])
    } else {
      handleSelectItem(null)
    }
  }
  const getIsSelected = (item: SelectOptions) => {
    if (isMultiple) {
      if (item.value) {
        return localSelected.includes(item.value)
      }
    }
    return selectedItem === item.value
  }

  const getModalView = () => {
    if (items) {
      return (
        <TouchableOpacity
          style={styles.backContainer}
          onPress={handleCloseSelector}
        >
          <View style={styles.secondaryBackContainer}>
            <CustomSelectorHeader
              label={labelSelector}
              handleCancel={handleCancelar}
            />
            <ScrollView style={{ width: `100%` }}>
              {getListToRender().map((item, index) => {
                const isSelected = getIsSelected(item)
                return (
                  <CustomSelectorItem
                    key={index}
                    item={item}
                    isSelected={getIsSelected(item)}
                    handleSelect={(i) => selectItem(i, isSelected)}
                  />
                )
              })}
            </ScrollView>
          </View>
          <CustomSelectorFooter
            handleConfirm={() => {
              if (isMultiple) {
                handleSelectItem(localSelected)
              }
              handleCloseSelector()
            }}
            isMultiple={isMultiple}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: '100%', height: '80%', backgroundColor: 'red' }}>
        <View style={{ paddingVertical: 10 }}>
          <ActivityIndicator size={20} />
        </View>
      </View>
    )
  }
  return (
    <Modal
      visible={isModalOpen}
      onDismiss={handleCloseSelector}
      transparent={true}
    >
      {getModalView()}
    </Modal>
  )
}
export default CustomSelectorModal
