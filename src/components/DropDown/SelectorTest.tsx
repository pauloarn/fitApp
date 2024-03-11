import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SelectOptions } from './types'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Index from '../CustomSelectorModal'

const inputColors = {
  default: '#9CFFAC'
}
interface IDropDownProps {
  selectedValue: SelectOptions | null
  onValueChange(selectedItem: SelectOptions | null): void
  label: string
  items: SelectOptions[]
}

const DropDownTest = ({
  selectedValue,
  onValueChange,
  items,
  label
}: IDropDownProps) => {
  const styles = useStyles()
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)
  function handleSelectItem(itemSelected: SelectOptions) {
    onValueChange(itemSelected)
    setIsPickerOpen(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPickerOpen(true)}
      >
        <Text style={styles.text}>{selectedValue?.label || label}</Text>
        <MaterialIcons
          name={'keyboard-arrow-down'}
          size={25}
          color={inputColors.default}
        />
      </TouchableOpacity>
      <Index
        isModalOpen={isPickerOpen}
        handleCloseSelector={() => setIsPickerOpen(false)}
        handleSelectItem={handleSelectItem}
        items={items}
      />
    </View>
  )
}

const useStyles = () => {
  const colorDefault = inputColors.default
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      width: '100%'
    },
    button: {
      borderColor: colorDefault,
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center'
    },
    text: {
      color: colorDefault,
      fontFamily: 'OpenSans_700Bold',
      fontSize: wp('3.5%')
    },
    modalView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemsContainer: {
      borderRadius: 10,
      overflow: 'scroll',
      backgroundColor: 'red'
      // padding: 5
      // alignItems: 'center',
      // alignSelf: 'center'
    },
    itemBtn: {
      width: '100%',
      alignItems: 'center',
      padding: wp('2%')
    },
    itemText: {
      width: '100%',
      fontSize: wp('4%'),
      textAlign: 'center'
    }
  })
}

export default DropDownTest
