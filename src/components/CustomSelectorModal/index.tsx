import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback } from 'react'
import { SelectOptions } from '../DropDown/types'
import useStyles from './styles'
import { Null } from '../../types/genericTypes'

interface CustomSelectorModalProps {
  isModalOpen: boolean
  labelSelector: string
  handleCloseSelector: () => void
  handleSelectItem: (selectedItem: Null<SelectOptions>) => void
  selectedItem: Null<number>
  items: SelectOptions[]
}
const CustomSelectorModal = ({
  isModalOpen,
  selectedItem,
  items,
  labelSelector,
  handleCloseSelector,
  handleSelectItem
}: CustomSelectorModalProps) => {
  const styles = useStyles()

  const getListToRender = useCallback(() => {
    const itemsToRender = [...items]
    itemsToRender.unshift({ value: 0, label: `Todos` })
    return itemsToRender
  }, [items])
  const getModalView = () => {
    if (items) {
      return (
        <TouchableOpacity
          style={styles.backContainer}
          onPress={handleCloseSelector}
        >
          <View style={styles.secondaryBackContainer}>
            <View style={styles.headerContainer}>
              <View style={{ width: '20%' }}></View>
              <Text
                style={{
                  fontSize: 15,
                  width: '60%',
                  fontWeight: `bold`,
                  textAlign: `center`
                }}
              >
                {labelSelector}
              </Text>
              <TouchableOpacity
                style={{ width: '20%', alignItems: `center` }}
                onPress={() => handleSelectItem(null)}
              >
                <Text style={{ color: 'blue' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ width: `100%` }}>
              {getListToRender().map((item, index) => {
                const isSelected = selectedItem === item.value
                return (
                  <TouchableOpacity
                    style={isSelected ? styles.itemSelectedBtn : styles.itemBtn}
                    onPress={() => handleSelectItem(item)}
                    key={index}
                  >
                    <Text
                      style={
                        isSelected ? styles.selectedItemText : styles.itemText
                      }
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
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
